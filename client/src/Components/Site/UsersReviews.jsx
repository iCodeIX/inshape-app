import React from 'react'
// import './UsersReviews.css';
const UsersReviews = () => {
    return (
        <section className="p-10 bg-gray-200 my-20">
            <h2 className='text-2xl font-semibold my-8 text-center'>Customer Reviews</h2>
            <p className='text-center text-lg'>Coming from gym coaches and health enthusiasts</p>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] justify-center gap-10 mt-5 justify-start">
                <div className="bg-white border border-gray-300 mb-4 p-6 rounded-lg shadow-sm  w-full transition-transform duration-300 ease-in-out">
                    <p className="font-medium mb-2"><strong>John Doe</strong></p>
                    <p className="text-sm">"Packed with essential nutrients and designed to support muscle recovery,
                        this Protein Powder is an excellent supplement for anyone committed to their fitness goals."</p>
                    <p className="text-yellow-500">Rating: ★★★★☆</p>
                </div>
                <div className="bg-white border border-gray-300 mb-4 p-6 rounded-lg shadow-sm  w-full transition-transform duration-300 ease-in-out">
                    <p className="font-medium"><strong>Jane Smith</strong></p>
                    <p className="text-sm">"I'm really happy with this purchase. Would highly recommend!"</p>
                    <p className="text-yellow-500">Rating: ★★★★★</p>
                </div>
                <div className="bg-white border border-gray-300 mb-4 p-6 rounded-lg shadow-sm  w-full transition-transform duration-300 ease-in-out">
                    <p className="font-medium"><strong>Michael James</strong></p>
                    <p className="text-sm">"This product exceeded my expectations! Excellent quality."</p>
                    <p className="text-yellow-500">Rating: ★★★★☆</p>
                </div>
                <div className="bg-white border border-gray-300 mb-4 p-6 rounded-lg shadow-sm  w-full transition-transform duration-300 ease-in-out">
                    <p className="font-medium"><strong>Sarah Joaquin</strong></p>
                    <p className="text-sm">"This Dumbbell Set is the perfect addition to your home gym if you're
                        looking to build strength and endurance. It comes with a variety of weights, allowing you to
                        gradually increase your challenge as you progress"</p>
                    <p className="text-yellow-500">Rating: ★★★★★</p>
                </div>
            </div>

        </section>
    )
}

export default UsersReviews
