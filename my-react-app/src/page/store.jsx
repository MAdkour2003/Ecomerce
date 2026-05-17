import itemsData from "../data/items";
import Storeitem from "../components/Storeitem";

function Store() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Store</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {itemsData.map((item) => (
          <div key={item.id} className=" rounded-lg p-4  ">
            <Storeitem {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Store;
