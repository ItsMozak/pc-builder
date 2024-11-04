export default function Navbar() {
    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-[#4085A5] text-white">
            <div className="mx-auto max-w-7xl ">
                <div className="relative flex h-16 justify-between">
                    <div className="flex flex-1 items-stretch justify-start">
                        <a className="flex flex-shrink-0 items-center" href="/">
                            <img alt="Moven PC builder logo" className="block h-12 w-auto mr-4" src="/pc-builder/images/Moven-logo-badge.png" ></img>
                            <span className='hidden md:block font-bold text-lg'>PC Builder</span>
                        </a>
                    </div>
                    <div className="flex-shrink-0 flex py-3 items-center space-x-8">
                        {/* <a className="text-gray-800 bg-indigo-100 hover:bg-indigo-200 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm "
                            href="#">Connect Wallet
                        </a> */}
                    </div>
                </div>
            </div>
        </div>
    )
}