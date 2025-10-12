import { getSingleProduct } from "@/services/Product";


const UpdateProductPage = async ({ params, }: { params: Promise<{ productId: string }> }) => {
    const {productId} = await params;
    const {data: product} = await getSingleProduct(productId);
    console.log(product)
    return (
        <div>
            i am page
        </div>
    ); 
};

export default UpdateProductPage;