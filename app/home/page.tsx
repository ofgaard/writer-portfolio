const Home = () => {
  return (
    <div className="flex flex-col items-center mt-10 w-screen min-h-screen py-2">
        <div className="border-b flex justify-between w-[70%] h-96 p-5">
        <div className="w-full">
            <img src="https://assets.thelocal.com/cdn-cgi/rs:fit:850/quality:75/plain/https://apiwp.thelocal.com/wp-content/uploads/2024/09/20210929-121208-2-1920x1280web-1.jpg" className="object-cover h-full w-full" alt="Description" />
        </div>
        <div className="w-3/6 text-center flex flex-col gap-6 p-5">
            <p className="font-extrabold">ARTICLE SERIES</p>
            <h1 className="text-3xl font-extrabold">How Parking Spaces Shaped the Mayoral Election of Copenhagen</h1>
            <p className="">An article series for B.T. covering the recent mayoral election in Copenhagen, focusing on the impact of parking space policies on voter behavior and election outcomes.</p>
        </div>
        </div>
        <div className="flex justify-between w-[70%] gap-3 mt-10">
            <div className=" p-4 w-1/3 flex flex-col gap-3 text-center">
            <img src="https://bt.bmcdn.dk/media/cache/resolve/image_1240/image/231/2319090/24985767-airport-employees-carry-luggages-at-the-new-tempor.jpg" className="object-center" alt="" />
            <p className="text-blue-400 font-extrabold">Expert Analysis</p>
            <h2 className="text-2xl font-extrabold">Ekspert gennemhuller EU-lov om håndbagage: Kan give dyrere flyrejser</h2>
            <p>Interviews with several economists talking about the consequences of making hand luggage free in EU airlines.</p>
            </div>
            <div className=" p-4 w-1/3 flex flex-col gap-3 text-center">
            <img src="https://bt.bmcdn.dk/media/cache/resolve/image_1240/image/231/2319090/24985767-airport-employees-carry-luggages-at-the-new-tempor.jpg" className="object-center" alt="" />
            <p className="text-blue-400 font-extrabold">Expert Analysis</p>
            <h2 className="text-2xl font-extrabold">Ekspert gennemhuller EU-lov om håndbagage: Kan give dyrere flyrejser</h2>
            <p>Interviews with several economists talking about the consequences of making hand luggage free in EU airlines.</p>
            </div>
            <div className=" p-4 w-1/3 flex flex-col gap-3 text-center">
            <img src="https://bt.bmcdn.dk/media/cache/resolve/image_1240/image/231/2319090/24985767-airport-employees-carry-luggages-at-the-new-tempor.jpg" className="object-center" alt="" />
            <p className="text-blue-400 font-extrabold">Expert Analysis</p>
            <h2 className="text-2xl font-extrabold">Ekspert gennemhuller EU-lov om håndbagage: Kan give dyrere flyrejser</h2>
            <p>Interviews with several economists talking about the consequences of making hand luggage free in EU airlines.</p>
            </div>
          

        </div>
    </div>
  );
};

export default Home;