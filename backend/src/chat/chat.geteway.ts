import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsException,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuththenticationSoket } from '../user/guard/authSocket.guard'; 
import { User } from '../user/schemas/user.schemas';

@WebSocketGateway(3002, { cors: true })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private activeUsers = new Map<string, string>(); // clientId -> userId

  constructor(
    private readonly authenticationSoket: AuththenticationSoket,
    // private readonly u

  ) {}

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  async handleConnection(client: Socket) {
    console.log('New connection: ', client.id);

    try {

      const user = await this.authenticationSoket.authenticate(client);

      this.activeUsers.set(client.id, user._id.toString());
      console.log(`User ${user.firstName,user.lastName} connected with client ID ${client.id}`);
    } catch (error) {
      console.error('Error during connection:', error);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log('Disconnected client:', client.id);
    this.activeUsers.delete(client.id);
  }

  @SubscribeMessage('joinGroup')
  handleJoinGroup(client: Socket, groupId: string) {
    const userId = this.activeUsers.get(client.id);
    if (!userId) {
      throw new WsException('Unauthorized');
    }

    client.join(groupId);
    console.log(`User ${userId} joined group ${groupId}`);
  }

  @SubscribeMessage('leaveGroup')
  handleLeaveGroup(client: Socket, groupId: string) {
    const userId = this.activeUsers.get(client.id);
    if (!userId) {
      throw new WsException('Unauthorized');
    }

    client.leave(groupId);
    console.log(`User ${userId} left group ${groupId}`);
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(client: Socket, data: any) {
    const { type, receiverId, groupId, message } = data;
    const userId = this.activeUsers.get(client.id);

    if (!userId) {
      throw new WsException('Unauthorized');
    }

    if (type === 'personal') {
      const receiverSocketId = [...this.activeUsers.entries()].find(([_, id]) => id === receiverId)?.[0];
      if (receiverSocketId) {
        this.server.to(receiverSocketId).emit('newMessage', { from: userId, message });
      }
    } else if (type === 'group') {
      this.server.to(groupId).emit('newMessage', { from: userId, groupId, message });
    }
  }
}
