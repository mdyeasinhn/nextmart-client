/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { NMTable } from "@/components/ui/core/NMTable/index";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/types/product";
import DeleteConfirmationModal from "@/components/ui/core/NMMODAL/DeleteConfirmationModal";
import { toast } from "sonner";
import { deleteProduct } from "@/services/Product";
import { useState } from "react";

const ManageProducts = ({ products }: { products: IProduct[] }) => {
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleDelete = (product: IProduct) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedProduct?._id) {
        const res = await deleteProduct(selectedProduct._id);
        console.log("res->", res);
        if (res.success) {
          toast.success(res.message);
          setModalOpen(false);
          setSelectedProduct(null);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
      toast.error("Failed to delete product");
    }
  };

  const handleView = (product: IProduct) => {
    console.log("Viewing product:", product);
    // Add your view logic here
  };

  const columns: ColumnDef<IProduct>[] = [
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.imageUrls[0]}
            alt={row.original.name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="truncate max-w-[150px]">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <span>{row.original.category.name}</span>,
    },
    {
      accessorKey: "brand",
      header: "Brand",
      cell: ({ row }) => <span>{row.original.brand.name}</span>,
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => <span>{row.original.stock}</span>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <span>$ {row.original.price.toFixed(2)}</span>,
    },
    {
      accessorKey: "offerPrice",
      header: "Offer Price", // Fixed typo
      cell: ({ row }) => (
        <span>
          $ {row.original.offerPrice ? row.original.offerPrice.toFixed(2) : "0"}
        </span>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <button
            className="text-gray-500 hover:text-blue-500 transition-colors"
            title="View"
            onClick={() => handleView(row.original)}
            type="button"
          >
            <Eye className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-green-500 transition-colors"
            title="Edit"
            onClick={() =>
              router.push(`/user/shop/products/update-product/${row.original._id}`)
            }
            type="button"
          >
            <Edit className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-red-500 transition-colors"
            title="Delete"
            onClick={() => handleDelete(row.original)}
            type="button"
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Manage Products</h1>
        <Button
          onClick={() => router.push("/user/shop/products/add-product")}
          size="sm"
          className="flex items-center gap-2"
        >
          Add Product <Plus className="w-4 h-4" />
        </Button>
      </div>
      
      <NMTable columns={columns} data={products || []} />

      {/* Single Modal outside the loop */}
      <DeleteConfirmationModal
        name={selectedProduct?.name || ""}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ManageProducts;