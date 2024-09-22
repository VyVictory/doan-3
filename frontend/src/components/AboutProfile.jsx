import { PaperClipIcon } from '@heroicons/react/20/solid'

export default function About() {
    return (
        <div>
            <div className="px-4 sm:px-0 text-white">
                <h3 className="text-base font-semibold leading-7 ">Applicant Information</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 ">Personal details and application.</p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 ">Full name</dt>
                        <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0">Margot Foster</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 ">Application for</dt>
                        <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0">Backend Developer</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 ">Email address</dt>
                        <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 ">Salary expectation</dt>
                        <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0">$120,000</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 ">About</dt>
                        <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0">
                            Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                            qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
                            pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                        </dd>
                    </div>
                </dl>
            </div >
        </div >
    )
}
