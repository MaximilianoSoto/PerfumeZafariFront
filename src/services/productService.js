const API_URL = import.meta.env.VITE_API_URL || 'https://api.perfumezafari.cl/api'



export const getProducts = async ({ limit = 20, offset = 0, search = '', tipo = '', marca = '' } = {}) => {
    try {
        const queryParams = new URLSearchParams({
            tipo,
            marca,
            search,
            parentId: '',
            limit,
            offset
        })

        const response = await fetch(`${API_URL}/perfumes?${queryParams.toString()}`)
        if (!response.ok) {
            throw new Error('No se pudo obtener los productos')
        }
        const result = await response.json()

        return result.data.map(item => {
            let imageUrl = item.imagen_principal
            if (imageUrl && !imageUrl.startsWith('http')) {
                imageUrl = `https://api.perfumezafari.cl${imageUrl}`
            }

            return {
                id: item.id,
                name: `${item.marca} ${item.nombre}`,
                type: `${item.tipo}`,
                price: Math.floor(Math.random() * 200) + 50, // Mock price
                image: imageUrl || 'https://via.placeholder.com/400x500?text=No+Image',
                tag: Number(item.avg_calidad) > 7 ? 'Top Rated' : null,
                tagColor: 'bg-luxury-gold'
            }
        })
    } catch (error) {
        console.error('Error fetching products:', error)
        return []
    }
}

export const searchProducts = async (query) => {
    if (!query) return []
    try {
        const response = await fetch(`${API_URL}/perfumes/search?q=${encodeURIComponent(query)}`)
        if (!response.ok) {
            throw new Error('Error en la búsqueda')
        }
        const result = await response.json()

        return result.data.map(item => {
            let imageUrl = item.imagen_principal
            if (imageUrl && !imageUrl.startsWith('http')) {
                imageUrl = `https://api.perfumezafari.cl${imageUrl}`
            }

            return {
                id: item.id,
                name: `${item.marca} ${item.nombre}`,
                type: `${item.tipo}`,
                price: Math.floor(Math.random() * 200) + 50,
                image: imageUrl || 'https://via.placeholder.com/400x500?text=No+Image',
                tag: Number(item.avg_calidad) > 7 ? 'Top Rated' : null,
                tagColor: 'bg-luxury-gold'
            }
        })
    } catch (error) {
        console.error('Error searching products:', error)
        return []
    }
}

export const getPopularTags = async () => {
    try {
        const response = await fetch(`${API_URL}/perfumes/tags/popular`)
        if (!response.ok) {
            throw new Error('Error al obtener tags')
        }
        const result = await response.json()
        return result
    } catch (error) {
        console.error('Error fetching tags:', error)
        return []
    }
}

export const getProductById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/perfumes/${id}`)
        if (!response.ok) {
            throw new Error('Error al obtener el producto')
        }
        const result = await response.json()
        const item = result.data

        let imageUrl = item.imagen_principal
        if (imageUrl && !imageUrl.startsWith('http')) {
            imageUrl = `https://api.perfumezafari.cl${imageUrl}`
        }

        return {
            id: item.id,
            name: item.nombre,
            brand: item.marca,
            type: item.tipo,
            ml: item.ml,
            image: imageUrl || 'https://via.placeholder.com/400x500?text=No+Image',
            description: item.description,
            stats: {
                quality: Number(item.avg_calidad),
                duration: Number(item.avg_duracion),
                projection: Number(item.avg_proyeccion)
            },
            tags: item.tags || []
        }
    } catch (error) {
        console.error('Error fetching product details:', error)
        return null
    }
}

export const proposePerfume = async (data) => {
    try {
        const formData = new FormData()

        for (const key in data) {
            if (key === 'notas' && Array.isArray(data[key])) {
                data[key].forEach(note => formData.append('notas[]', note))
            } else if (data[key] !== null && data[key] !== undefined) {
                formData.append(key, data[key])
            }
        }

        const response = await fetch(`${API_URL}/perfumes/propose`, {
            method: 'POST',
            body: formData
            // Content-Type header is automatically set by browser for FormData
        })

        if (!response.ok) {
            const error = new Error('Error al enviar la propuesta')
            error.status = response.status
            throw error
        }

        const result = await response.json()
        return result
    } catch (error) {
        console.error('Error proposing perfume:', error)
        throw error
    }
}
