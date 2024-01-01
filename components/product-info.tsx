"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Ghost } from "lucide-react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"

import { SanityProduct } from "@/config/inventory"
import { getSizeName } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface Props {
  product: SanityProduct
}

export function ProductInfo({ product }: Props) {
  const { addItem, cartDetails, incrementItem } = useShoppingCart()
  // need to fix multi size product add to cart
  const inCart = !!cartDetails?.[product._id]
  const { toast } = useToast()
  const [currentSize, setCurrentSize] = useState(product.sizes[0])
  function addToCart() {
    const item = {
      ...product,
      productData: {
        size: currentSize,
      },
    }
    inCart ? incrementItem(item._id) : addItem(item)
    toast({
      title: `${item.name} (${getSizeName(currentSize)})`,
      description: "Product added to cart",
      action: (
        <Link href={"/cart"}>
          <Button variant={"link"} className="gap-x-2 whitespace-nowrap">
            <span>Open cart</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      ),
    })
  }

  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight">
          {formatCurrencyString({
            currency: product.currency,
            value: product.price,
          })}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">Description</h3>
        <div className="space-y-6 text-base">{product.description}</div>
      </div>

      <div className="mt-4">
        <p>
          Size: <strong>{getSizeName(currentSize)}</strong>
        </p>
        {product.sizes.map((size) => (
          <Button
            onClick={() => setCurrentSize(size)}
            key={size}
            variant={currentSize === size ? "default" : "ghost"}
            className="mr-2 mt-4"
          >
            {getSizeName(size)}
          </Button>
        ))}
      </div>

      <form className="mt-6">
        <div className="mt-4 flex">
          <Button
            onClick={addToCart}
            type="button"
            className="w-full bg-violet-600 py-6 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            Add to cart
          </Button>
        </div>
      </form>
    </div>
  )
}
