import React from 'react'
const  Experience = () =>{
  return (
    <div className='my-12'>
        <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-3xl font-bold mb-4'>Experience</h1>
            <p className='text-lg'>Here are some of my experiences in the field of software development.</p>
        </div>
        <div className='max-auto grid grid-cols-1 md:grid-cols-2 gap-4 p-6'>

            <div className='flex flex-col items-center justify-center'>
                <div className='w-full max-w-4xl p-6 bg-white rounded-lg shadow-md'>
                <h2 className='text-2xl font-semibold mb-4'>Software Developer Intern</h2>
                <p className='text-gray-700 mb-2'>Company Name - Mirpur DOSH</p>
                <p className='text-gray-600'>June 2022 - December 2022</p>
                <ul className='list-disc list-inside mt-4'>
                    <li>Developed and maintained web applications using React and Node.js.</li>
                    <li>Collaborated with cross-functional teams to design and implement new features.</li>
                    <li>Participated in code reviews and contributed to team knowledge sharing.</li>
                </ul>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <div className='w-full max-w-4xl p-6 bg-white rounded-lg shadow-md'>
                <h2 className='text-2xl font-semibold mb-4'>Software Developer</h2>
                <p className='text-gray-700 mb-2'>Company Name - Dhanmondi 27</p>
                <p className='text-gray-600'>January 2022 - May 2023</p>
                <ul className='list-disc list-inside mt-4'>
                    <li>Designed and developed RESTful APIs using Node.js and Express.</li>
                    <li>Implemented responsive web designs using HTML, CSS, and JavaScript.</li>
                    <li>Worked with databases like MongoDB and MySQL for data storage and retrieval.</li>
                </ul>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center mt-8'>
                <div className='w-full max-w-4xl p-6 bg-white rounded-lg shadow-md'>
                <h2 className='text-2xl font-semibold mb-4'>Internship</h2>
                <p className='text-gray-700 mb-2'>Company Name - Location</p>
                <p className='text-gray-600'>June 2021 - August 2021</p>
                <ul className='list-disc list-inside mt-4'>
                    <li>Assisted in the development of internal tools and applications.</li>
                    <li>Conducted testing and debugging of software applications.</li>
                    <li>Participated in team meetings and contributed to project discussions.</li>
                </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Experience
