import { Footer } from 'flowbite-react'

export default function footer() {
    return (
        <>
        
        <div className='w-full rounded-lg bg-white p-4 shadow dark:bg-gray-800 md:p-6'>
            <div className='text-center'>Developers</div>
            <div >
            <Footer.LinkGroup className='flex justify-center'>
                <Footer.Link className='px-4'href="https://github.com/Eduarte783">
                Eric Duarte
                </Footer.Link>
                <Footer.Link className='px-4' href="https://github.com/emilykiss">
                Emily Kiss
                </Footer.Link>
                <Footer.Link className='px-4' href="https://github.com/seiplet93">
                Terry Seiple
                </Footer.Link>
                <Footer.Link className='px-4' href="https://github.com/mitchdmarino">
                Mitchell Marino
                </Footer.Link>
            </Footer.LinkGroup>
            </div>
        </div>
        </>
    )
}