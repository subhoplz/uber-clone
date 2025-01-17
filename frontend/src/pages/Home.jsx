import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <div>
            <div className='bg-cover bg-bottom bg-[url("/src/assets/uberw.png")] h-screen pt-8 flex justify-between flex-col w-full bg-red-400'>
                <img className='w-16 m-8' src="/src/assets/uber.png" alt="" />
                <div className=' bg-white py-5 px-4'>
                    <h2 className='text-2xl font-bold'>Get Started with uber </h2>
                    <Link to="/User-Login" className="font-bold flex justify-center bg-black text-white py-2 rounded px-5 ">Continue</Link>
                </div>
            </div>
        </div>
    )
}
export default Home