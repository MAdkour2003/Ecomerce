import { useNavigate, useParams } from "react-router-dom";
import StoreItem from "../components/Storeitem";
import { toCartProduct } from "../store";

import { Useproductid } from "../Hook/UseProduct";
import { Button } from "@/components/ui/button";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: product, isPending, isError, error } = Useproductid(id ?? "");

  if (isPending) return <p className="p-6 text-center">Loading.....</p>;
  if (isError)
    return <p className="p-6 text-remove">{(error as Error).message}</p>;
  if (!product) return <p className="p-6 text-remove">Product not found </p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Button
        onClick={() => navigate("/products")}
        className="text-4xl font-bold text-sidebar"
      >
        ~ Back to Home
      </Button>
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-contain mb-4"
      />
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-textbody capitalize">{product.category}</p>
      <p className="text-xl font-bold text-price mt-2">${product.price}</p>
      <p className="text-textbody mt-4">{product.description}</p>
      <div className="mt-6">
        <StoreItem product={toCartProduct(product)} />
      </div>
    </div>
  );
};

export default Details;
