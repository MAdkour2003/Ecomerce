import { Link } from "react-router-dom";
import itemsData from "../data/items";

function Home() {
  return (
    <div>
      <h1 className="mb-5 text-4xl text font-semibold">Home</h1>
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
        {itemsData.map((item) => (
          //item card
          <div key={item.id} className="bg-white p-4.3 rounded-md ">
            <div className="text-6xl mb-2.5 text-center ">{item.icon}</div>
            {/* body */}
            <div className="text-center">
              <h3 className="font-bold my-2.5">{item.name}</h3>
              <p className="text-gray-500 p-2 my-2.5">{item.description}</p>
              <Link
                to={`/${item.price}`}
                className="text-blue-600 no-underline items-end"
              >
                View price
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

// function home(){

//   return

//     <div>
//         <h1 className="tiitle">home</h1>
//         <div className="grid">
//             {itemsData.map((item) => (
//              <div key = {item.id}>
//                 <div className="itemname">{item.icon}</div>
//                 <div className="itembody">
//                   <h3 className="itemname">{item.name}</h3>
//                   <p></p>

//                 </div>

//              </div>

//             )) }

//         </div>

//   </div>

// }
