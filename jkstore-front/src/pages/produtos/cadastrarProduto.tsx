import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import styles from "./cadastrarProduto.module.css"

interface ProductFormData {
  title: string
  image?: FileList
  description: string
  price: string
  available: boolean
  highlight: boolean
}

export function CreateProductForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm<ProductFormData>({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      available: true,
      highlight: false,
    },
  })

  const imageFile = watch("image")

  if (imageFile && imageFile.length > 0) {
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(imageFile[0])
  }

  const formatBRL = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    const numberFloat = (Number(numbers) / 100).toFixed(2)
    return numberFloat.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  const onSubmit = (data: ProductFormData) => {
    const formattedData = {
      ...data,
      price: formatBRL(data.price),
      image: imageFile?.[0]?.name || "Sem imagem",
    }
    console.log("Dados do Produto:", formattedData)
    alert("Produto salvo com sucesso! Verifique o console.")
  }

  const handleCancel = () => {
    reset()
    setImagePreview(null)
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className="text-2xl">Criar Novo Produto</h2>
          <p>Preencha os campos abaixo para adicionar um novo produto ao seu catálogo</p>
        </div>

        <div className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* Title Field */}
            <div className={styles.fieldGroup}>
              <Label htmlFor="title" className={styles.label}>
                Título do Produto *
              </Label>
              <Input
                id="title"
                placeholder="Ex: Teclado Mecânico RGB"
                {...register("title", {
                  required: "Título é obrigatório",
                  minLength: {
                    value: 3,
                    message: "Título deve ter pelo menos 3 caracteres",
                  },
                })}
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && <p className={styles.errorMessage}>{errors.title.message}</p>}
            </div>

            {/* Image Upload Field */}
            <div className={styles.fieldGroup}>
              <Label htmlFor="image" className={styles.label}>
                Imagem do Produto
              </Label>
              <div className={styles.imageContainer}>
                <div className={styles.imageUpload}>
                  <Input id="image" type="file" accept="image/*" {...register("image")} />
                  <p className={styles.helperText}>PNG, JPG, GIF até 5MB</p>
                </div>

                {/* Image Preview */}
                {imagePreview && (
                  <div className={styles.imagePreviewWrapper}>
                    <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Description Field */}
            <div className={styles.fieldGroup}>
              <Label htmlFor="description" className={styles.label}>
                Descrição
              </Label>
              <Textarea
                id="description"
                placeholder="Descreva as características e benefícios do produto..."
                rows={4}
                {...register("description")}
              />
              <p className={styles.helperText}>{watch("description")?.length || 0} caracteres</p>
            </div>

            {/* Price Field */}
            <div className={styles.fieldGroup}>
              <Label htmlFor="price" className={styles.label}>
                Preço (R$) *
              </Label>
              <div className={styles.priceInputWrapper}>
                <span className={styles.pricePrefix}>R$</span>
                <Input
                  id="price"
                  type="text"
                  placeholder="0,00"
                  {...register("price", {
                    required: "Preço é obrigatório",
                    validate: (value) => {
                      const numbers = value.replace(/\D/g, "")
                      return numbers !== "" && numbers !== "0" ? true : "Preço deve ser maior que 0"
                    },
                  })}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "")
                    if (value) {
                      e.target.value = formatBRL(value)
                    }
                  }}
                  className={`${styles.priceInput} ${errors.price ? "border-destructive" : ""}`}
                />
              </div>
              {errors.price && <p className={styles.errorMessage}>{errors.price.message}</p>}
            </div>

            <div className={styles.togglesContainer}>
              <div className={styles.toggleItem}>
                <div className={styles.toggleContent}>
                  <div className={`${styles.toggleIcon} ${styles.toggleIconCheck}`}>
                    <svg className={styles.toggleIconCheckSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <Label className={`${styles.toggleLabel}`}>Disponível para venda</Label>
                    <p className={styles.toggleDescription}>O produto será visível para clientes</p>
                  </div>
                </div>
                <Controller
                  name="available"
                  control={control}
                  render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                />
              </div>

              <div className={styles.toggleItem}>
                <div className={styles.toggleContent}>
                  <div className={`${styles.toggleIcon} ${styles.toggleIconStar}`}>
                    <svg className={styles.toggleIconStarSvg} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div>
                    <Label className={styles.toggleLabel}>Destacar produto</Label>
                    <p className={styles.toggleDescription}>Aparecerá em destaque na página inicial</p>
                  </div>
                </div>
                <Controller
                  name="highlight"
                  control={control}
                  render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className={styles.buttonsGroup}>
              <Button
                type="button"
                onClick={handleCancel}
                className={`${styles.button} ${styles.buttonCancel}`}
              >
                Cancelar
              </Button>
              <Button type="submit" className={styles.button}>
                Salvar Produto
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
