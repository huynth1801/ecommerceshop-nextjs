"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CldUploadWidget } from "next-cloudinary"
import { ImagePlus, Trash } from "lucide-react"
import Image from "next/image"

interface CloudinaryUploadResult {
  info: {
    secure_url: string
  }
}

interface ImageUploadProps {
  value: string[]
  onChange: (url: string) => void
  onRemove: (url: string) => void
  disabled?: boolean
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
  disabled = false,
}) => {
  const [images, setImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)

  const handleUploadSuccess = (result: CloudinaryUploadResult) => {
    if (result?.info?.secure_url) {
      setImages((prevImages) => [...prevImages, result.info.secure_url])
      onChange(result.info.secure_url)
    }
  }

  const removeImage = (index: number) => {
    const url = value[index]
    onRemove(url)
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {value.map((url, index) => (
          <div
            key={index}
            className="relative w-[150px] h-[150px] rounded-md overflow-hidden border border-gray-300"
          >
            <Image
              src={url}
              alt={`Uploaded image ${index + 1}`}
              fill
              className="object-cover"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 bg-white border border-gray-300 hover:bg-gray-200"
              onClick={() => removeImage(index)}
              disabled={uploading || disabled}
            >
              <Trash className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>

      <CldUploadWidget
        uploadPreset="b0axqvqe"
        onSuccess={(result, { widget }) => {
          handleUploadSuccess(result as CloudinaryUploadResult)
          widget.close()
        }}
        options={{
          multiple: true,
          maxFiles: 5,
          showAdvancedOptions: false,
        }}
      >
        {({ open }) => (
          <Button
            type="button"
            disabled={uploading || disabled}
            variant="secondary"
            onClick={() => open()}
            className="flex items-center gap-2 p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
          >
            <ImagePlus className="h-5 w-5" />
            Upload Images
          </Button>
        )}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload
