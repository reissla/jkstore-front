import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import Button from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { createProduct, type AnexoPayload, type CreateProductPayload } from "@/services/produtoService"
import styles from "./cadastrarProduto.module.css"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

interface ProductFormData {
  title: string
  image?: FileList
  description: string
  price: string
  disponivel: boolean
  destaque: boolean
}

export function CreateProductForm() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [attachmentData, setAttachmentData] = useState<AnexoPayload | null>(null)
  const [pendingProducts, setPendingProducts] = useState<CreateProductPayload[]>([])
  const [isSending, setIsSending] = useState(false)
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
      disponivel: true,
      destaque: false,
    },
  })

  const imageFile = watch("image")

  useEffect(() => {
    if (!imageFile || imageFile.length === 0) {
      setImagePreview(null)
      setAttachmentData(null)
      return
    }

    const file = imageFile[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      setImagePreview(result)
      const base64 = result?.split(",")[1] ?? ""
      setAttachmentData({
        nome: file.name,
        nomeExibicao: file.name,
        ordemInsercao: 0,
        url: "",
        base64,
      })
    }
    reader.readAsDataURL(file)

    return () => {
      if (reader.readyState === FileReader.LOADING) {
        reader.abort()
      }
    }
  }, [imageFile])

  const formatBRL = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    const numberFloat = (Number(numbers) / 100).toFixed(2)
    return numberFloat.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  const parsePriceToNumber = (value: string) => {
    if (!value) return 0
    return Number(value.replace(/\./g, "").replace(",", ".")) || 0
  }

  const processImageToBase64 = (file: File): Promise<AnexoPayload> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        const base64 = result?.split(",")[1] ?? ""
        resolve({
          nome: file.name,
          nomeExibicao: file.name,
          ordemInsercao: 0,
          url: "",
          base64,
        })
      }
      reader.onerror = () => reject(new Error("Erro ao processar imagem"))
      reader.readAsDataURL(file)
    })
  }

  const buildProductPayload = (
    formData: ProductFormData,
    attachment?: AnexoPayload | null,
  ): CreateProductPayload => {
    const { title, description, price, disponivel, destaque } = formData

    return {
      titulo: title,
      descricao: description,
      preco: parsePriceToNumber(price),
      disponivel,
      destaque,
      imagemProduto: attachment ?? undefined,
    }
  }

  const onSubmit = async (data: ProductFormData) => {
    let finalAttachmentData = attachmentData

    // Se há uma imagem selecionada mas ainda não foi processada, processa agora
    if (data.image && data.image.length > 0 && !finalAttachmentData) {
      try {
        finalAttachmentData = await processImageToBase64(data.image[0])
      } catch (error) {
        console.error("Erro ao processar imagem:", error)
        toast.error("Erro ao processar imagem. Tente novamente.")
        return
      }
    }

    const productPayload = buildProductPayload(data, finalAttachmentData)
    setPendingProducts((prev) => [...prev, productPayload])
    toast.success("Produto adicionado à lista")
    handleCancel()
  }

  const handleSendPendingProducts = async () => {
    if (!pendingProducts.length) {
      toast.error("Adicione pelo menos um produto antes de enviar.")
      return
    }

    setIsSending(true)
    try {
      await Promise.all(pendingProducts.map((product) => createProduct(product)))
      toast.success(`${pendingProducts.length} produto(s) enviados com sucesso!`)
      setPendingProducts([])
      navigate("/home")
    } catch (error) {
      console.error("Erro ao enviar produtos:", error)
      toast.error("Erro ao enviar produtos. Tente novamente.")
    } finally {
      setIsSending(false)
    }
  }

  const handleCancel = () => {
    reset()
    setImagePreview(null)
    setAttachmentData(null)
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.subTitle}>Criar Novo Produto</h2>
          <p>Preencha os campos abaixo para adicionar um novo produto ao seu catálogo</p>
        </div>

        <div className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* Title Field */}
            <div className={styles.fieldGroup}>
              <Label htmlFor="title" className={styles.label}>
                Título do Produto *
              </Label>
              <Controller
                name="title"
                control={control}
                rules={{
                  required: "Título é obrigatório",
                  minLength: {
                    value: 3,
                    message: "Título deve ter pelo menos 3 caracteres",
                  },
                }}
                render={({ field }) => (
                  <Input
                    id="title"
                    placeholder="Ex: Teclado Mecânico RGB"
                    {...field}
                    className={`${styles.inputField} ${errors.title ? "border-destructive" : ""}`}
                  />
                )}
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
                  <Controller
                    name="image"
                    control={control}
                    render={({ field: { onChange, value, ...field } }) => (
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        {...field}
                        className={styles.inputField}
                        onChange={(e) => {
                          onChange(e.target.files)
                        }}
                      />
                    )}
                  />
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
                className={styles.textareaField}
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
                <Controller
                  name="price"
                  control={control}
                  rules={{
                    required: "Preço é obrigatório",
                    validate: (value) => {
                      const numbers = value.replace(/\D/g, "")
                      return numbers !== "" && numbers !== "0" ? true : "Preço deve ser maior que 0"
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      id="price"
                      type="text"
                      placeholder="0,00"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "")
                        if (value) {
                          const formatted = formatBRL(value)
                          field.onChange(formatted)
                        } else {
                          field.onChange("")
                        }
                      }}
                      className={`${styles.priceInput} ${styles.inputField} ${
                        errors.price ? "border-destructive" : ""
                      }`}
                    />
                  )}
                />
              </div>
              {errors.price && <p className={styles.errorMessage}>{errors.price.message}</p>}
            </div>

            <div className={styles.togglesContainer}>
              <div className={styles.toggleItem}>
                <div className={styles.highlightControls}>
                  <Controller
                    name="destaque"
                    control={control}
                    render={({ field }) => (
                      <div className={styles.availabilityControl}>
                        <Label className={styles.toggleLabel}>Destaque</Label>
                        <div className={styles.availabilityOptions}>
                          <button
                            type="button"
                            className={`${styles.availabilityButton} ${
                              field.value ? styles.availabilityButtonActive : ""
                            }`}
                            onClick={() => field.onChange(true)}
                          >
                            Em destaque
                          </button>
                          <button
                            type="button"
                            className={`${styles.availabilityButton} ${
                              !field.value ? styles.availabilityButtonActive : ""
                            }`}
                            onClick={() => field.onChange(false)}
                          >
                            Sem destaque
                          </button>
                        </div>
                      </div>
                    )}
                  />
                  <Controller
                    name="disponivel"
                    control={control}
                    render={({ field }) => (
                      <div className={styles.availabilityControl}>
                        <Label className={styles.toggleLabel}>Disponibilidade</Label>
                        <div className={styles.availabilityOptions}>
                          <button
                            type="button"
                            className={`${styles.availabilityButton} ${
                              field.value ? styles.availabilityButtonActive : ""
                            }`}
                            onClick={() => field.onChange(true)}
                          >
                            Disponível
                          </button>
                          <button
                            type="button"
                            className={`${styles.availabilityButton} ${
                              !field.value ? styles.availabilityButtonActive : ""
                            }`}
                            onClick={() => field.onChange(false)}
                          >
                            Indisponível
                          </button>
                        </div>
                      </div>
                    )}
                  />
                </div>
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

        <div className={styles.pendingSection}>
          <div className={styles.pendingHeader}>
            <div>
              <h3 className={styles.pendingTitle}>Produtos adicionados</h3>
            </div>
            <Button
              type="button"
              onClick={handleSendPendingProducts}
              disabled={!pendingProducts.length || isSending}
              className={styles.sendButton}
            >
              {isSending
                ? "Enviando..."
                : pendingProducts.length
                  ? `Enviar ${pendingProducts.length} produto(s)`
                  : "Enviar produtos"}
            </Button>
          </div>

          {pendingProducts.length > 0 ? (
            <div className={styles.tableWrapper}>
              <table className={styles.pendingTable}>
                <thead className={styles.pendingTableHeader}>
                  <tr>
                    <th>Título</th>
                    <th>Preço</th>
                    <th>Disponível</th>
                    <th>Destaque</th>
                    <th>Imagem</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingProducts.map((product, index) => (
                    <tr key={`${product.titulo}-${index}`}>
                      <td>{product.titulo}</td>
                      <td>
                        {product.preco.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </td>
                      <td>{product.disponivel ? "Sim" : "Não"}</td>
                      <td>{product.destaque ? "Sim" : "Não"}</td>
                      <td>{product.imagemProduto && product.imagemProduto.nomeExibicao ? product.imagemProduto.nomeExibicao.substring(0, 5) + "..." : "Sem imagem"}</td>
                      <td>
                        <button
                          type="button"
                          className={styles.removeButton}
                          onClick={() =>
                            setPendingProducts((prev) => prev.filter((_, i) => i !== index))
                          }
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className={styles.pendingEmpty}>Nenhum produto na lista ainda.</p>
          )}
        </div>
      </div>
    </div>
  )
}
