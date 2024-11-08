import React from 'react'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/16/solid'

const Footer = () => {
    return (
        <footer className="bg-[#023047] text-gray-300 w-full">
            <div className="max-w-6xl mx-auto px-4 py-10 md:py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="mb-8 md:mb-0">
                        <a href="/" className="text-2xl font-bold text-white">Logo</a>
                        <p className="mt-4 text-sm">
                            Cung cấp giải pháp sáng tạo cho nhu cầu kinh doanh của bạn từ năm 2024.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Công ty</h3>
                        <ul className="space-y-2">
                            <li><a href="/about" className="hover:text-white transition-colors">Về chúng tôi</a></li>
                            <li><a href="/services" className="hover:text-white transition-colors">Dịch vụ</a></li>
                            <li><a href="/team" className="hover:text-white transition-colors">Đội ngũ</a></li>
                            <li><a href="/contact" className="hover:text-white transition-colors">Liên hệ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Tài nguyên</h3>
                        <ul className="space-y-2">
                            <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                            <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
                            <li><a href="/support" className="hover:text-white transition-colors">Hỗ trợ</a></li>
                            <li><a href="/privacy" className="hover:text-white transition-colors">Chính sách bảo mật</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Theo dõi chúng tôi</h3>
                        <div className="grid gap-2">
                            <div className="hover:text-white transition-colors flex gap-2">
                                {/* <FaFacebook size={24} /> */}
                                <EnvelopeIcon className='size-7' />
                                <span className="">Email:</span>
                                <span>abc@gmail.com</span>
                            </div>
                            <div className="hover:text-white transition-colors flex gap-2">
                                {/* <FaFacebook size={24} /> */}
                                <PhoneIcon className='size-7' />
                                <span className="">Hotline:</span>
                                <span className="">113</span>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
                    <p>&copy; {new Date().getFullYear()} Tên Công Ty FUCKING NEMO. Đã đăng ký bản quyền.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer