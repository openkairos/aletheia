import { Button, Logo } from '@/components';
import { Link } from 'react-router';

export function LoginPage() {
  return (
    <div className='relative overflow-hidden h-screen'>
      <div className='grid grid-cols-12 gap-3 h-screen bg-white'>
        <div className='xl:col-span-4 lg:col-span-6 col-span-12 sm:px-12 px-4'>
          <div className='flex h-screen items-center px-3 lg:justify-start justify-center'>
            <div className='max-w-md w-full mx-auto'>
              <Link to='/'>
                <Logo width={42} height={42} />
              </Link>
              <h3 className='text-2xl font-bold my-3 mt-5'>Sign In</h3>
              <p className='text-sm font-medium'>Aletheia</p>
              <form className='mt-6'>
                <Button type='button'>Sign In</Button>
              </form>
            </div>
          </div>
        </div>
        <div className='xl:col-span-8 lg:col-span-6 col-span-12 lg:block hidden relative overflow-hidden bg-[#8f1f27]'>
          <div className='absolute -top-1/3 -left-1/6 block bg-transparent z-10 border-120 border-[#fe3e49] rounded-full w-200 h-200 opacity-20'></div>
          <div className='z-10 opacity-50 block absolute  bottom-2 right-2'>
            <Logo width={450} height={450} />
          </div>
          <div className='flex xl:justify-start justify-center xl:ps-80 h-screen items-center z-10 relative'>
            <div className='w-1/2'>
              <h2 className='text-white text-5xl font-bold'>Welcome to Aletheia!</h2>
              <p className='opacity-75 text-white my-4 text-base font-medium'>
                A visual interface for Kairos that reveals customer insights through clean analytics and intuitive
                dashboards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
