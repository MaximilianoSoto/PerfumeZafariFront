<template>
  <div class="min-h-screen bg-deep-midnight text-white font-montserrat flex flex-col">


    <main class="flex-grow container mx-auto py-8">
      <div class="w-full">
    
        <div class="bg-[#1A1B24]/80 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
            
            <!-- Left Panel: Image Wrapper & Preview -->
            <div class="w-full md:w-2/5 relative bg-black/40 flex flex-col items-center justify-center p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/5 group min-h-[280px] md:min-h-0">
                <!-- Background decorative elements -->
                <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
                <div class="absolute top-0 left-0 w-full h-full bg-[url('../../assets/img/pattern.png')] opacity-5 mix-blend-overlay"></div>
                
                <!-- Main Image Preview or Placeholder -->
                <div class="relative z-20 w-full max-w-[200px] md:max-w-sm aspect-[3/4] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 transition-all duration-500 group-hover:ring-luxury-gold/30">
                     <!-- Badge -->
                     <div class="absolute top-4 left-4 z-30 bg-luxury-gold text-deep-midnight text-xs font-bold px-3 py-1 uppercase tracking-widest shadow-lg">
                        New Arrival
                     </div>

                    <img 
                        v-if="previewImage" 
                        :src="previewImage" 
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    >
                    <div v-else class="w-full h-full bg-deep-midnight/50 flex flex-col items-center justify-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span class="text-sm tracking-widest uppercase">Sin Imagen</span>
                    </div>

                    <!-- Upload Overlay accessible on hover or if empty -->
                    <label class="absolute inset-0 z-40 cursor-pointer bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-300">
                        <input type="file" @change="handleFileUpload" accept="image/*" class="hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mb-2 text-luxury-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <span class="uppercase tracking-widest text-sm font-bold">Subir Imagen</span>
                    </label>
                </div>

                <div class="relative z-20 mt-6 text-center">
                    <h2 class="text-2xl font-bold text-white mb-1">{{ nombre || 'Nombre del Perfume' }}</h2>
                    <p class="text-luxury-gold text-sm tracking-widest uppercase">{{ marca || 'Marca Exclusiva' }}</p>
                </div>
            </div>

            <!-- Right Panel: Form -->
            <div class="w-full md:w-3/5 p-6 md:p-12">
                 <form @submit.prevent="submitProposal" class="space-y-8">
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <!-- Brand & Name -->
                        <div class="space-y-2">
                             <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">Marca</label>
                             <input 
                                v-bind="marcaAttrs"
                                v-model="marca"
                                type="text" 
                                class="w-full bg-deep-midnight/50 border-b border-white/10 px-4 py-3 text-white focus:outline-none focus:border-luxury-gold transition-colors placeholder-white/20" 
                                :class="{ 'border-red-500': errors.marca }"
                                placeholder="Ej. Jean Paul Gaultier"
                             >
                             <span v-if="errors.marca" class="text-xs text-red-400 block">{{ errors.marca }}</span>
                        </div>
                        <div class="space-y-2">
                             <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">Nombre</label>
                             <input 
                                v-bind="nombreAttrs"
                                v-model="nombre"
                                type="text" 
                                class="w-full bg-deep-midnight/50 border-b border-white/10 px-4 py-3 text-white focus:outline-none focus:border-luxury-gold transition-colors placeholder-white/20" 
                                :class="{ 'border-red-500': errors.nombre }"
                                placeholder="Ej. Le Male Elixir"
                             >
                             <span v-if="errors.nombre" class="text-xs text-red-400 block">{{ errors.nombre }}</span>
                        </div>
                        
                        <!-- Gender & Type -->
                        <div class="space-y-2">
                            <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">Género</label>
                            <select 
                                v-bind="genderAttrs"
                                v-model="gender"
                                class="w-full bg-deep-midnight/50 border-b border-white/10 px-4 py-3 text-white focus:outline-none focus:border-luxury-gold appearance-none cursor-pointer"
                            >
                                <option value="" disabled selected class="text-gray-500">Selecciona un género</option>
                                <option value="hombre">Hombre</option>
                                <option value="mujer">Mujer</option>
                                <option value="unisex">Unisex</option>
                            </select>
                             <span v-if="errors.gender" class="text-xs text-red-400 block">{{ errors.gender }}</span>
                        </div>
                        <div class="space-y-2">
                            <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">Tipo</label>
                            <select 
                                v-bind="tipoAttrs"
                                v-model="tipo"
                                class="w-full bg-deep-midnight/50 border-b border-white/10 px-4 py-3 text-white focus:outline-none focus:border-luxury-gold appearance-none cursor-pointer"
                            >
                                <option value="" disabled selected class="text-gray-500">Selecciona un tipo</option>
                                <option value="original">Original</option>
                                <option value="inspiracion">Dupe</option>
                                <option value="tester">Tester</option>
                                <option value="decant">Decant</option>
                            </select>
                             <span v-if="errors.tipo" class="text-xs text-red-400 block">{{ errors.tipo }}</span>
                        </div>
                    </div>

                     <!-- Description -->
                    <div class="space-y-2">
                        <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">Descripción</label>
                        <textarea 
                            v-bind="descriptionAttrs"
                            v-model="description"
                            rows="3" 
                            class="w-full bg-deep-midnight/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-luxury-gold transition-colors resize-none placeholder-white/20" 
                            :class="{ 'border-red-500': errors.description }"
                            placeholder="Escribe una breve reseña de la fragancia..."
                        ></textarea>
                         <span v-if="errors.description" class="text-xs text-red-400 block">{{ errors.description }}</span>
                    </div>

                     <!-- Details -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div class="space-y-2">
                             <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">ML</label>
                             <select
                                v-bind="mlAttrs"
                                v-model.number="ml"
                                class="w-full bg-deep-midnight/50 border-b border-white/10 px-4 py-3 text-white focus:outline-none focus:border-luxury-gold appearance-none cursor-pointer"
                                :class="{ 'border-red-500': errors.ml }"
                            >
                                <option value="" disabled class="text-gray-500">Selecciona ML</option>
                                <option :value="25">25 ml</option>
                                <option :value="50">50 ml</option>
                                <option :value="100">100 ml</option>
                                <option :value="200">200 ml</option>
                            </select>
                            <span v-if="errors.ml" class="text-xs text-red-400 block">{{ errors.ml }}</span>
                        </div>
                        <div class="space-y-2">
                             <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">Concentración</label>
                             <select 
                                v-bind="concentracionAttrs"
                                v-model="concentracion"
                                class="w-full bg-deep-midnight/50 border-b border-white/10 px-4 py-3 text-white focus:outline-none focus:border-luxury-gold appearance-none cursor-pointer"
                                :class="{ 'border-red-500': errors.concentracion }"
                            >
                                <option value="" disabled selected class="text-gray-500">Selecciona concentración</option>
                                <option value="Eau de Toilette">Eau de Toilette (Edt)</option>
                                <option value="Eau de Parfum">Eau de Parfum (Edp)</option>
                                <option value="Parfum">Parfum</option>
                                <option value="Elixir">Elixir</option>
                            </select>
                            <span v-if="errors.concentracion" class="text-xs text-red-400 block">{{ errors.concentracion }}</span>
                        </div>
                    </div>

                    <!-- Notes -->
                    <div class="space-y-2">
                        <label class="text-xs font-bold text-gray-400 uppercase tracking-wider">Notas Olfativas</label>
                        <div class="flex flex-wrap gap-2 p-3 bg-deep-midnight/50 border border-white/10 rounded-lg min-h-[50px]" :class="{ 'border-red-500': errors.notas }">
                            <span v-for="(note, index) in notas" :key="index" class="bg-luxury-gold text-deep-midnight font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1">
                                {{ note }}
                                <button @click.prevent="removeNote(index)" class="hover:text-white transition-colors">&times;</button>
                            </span>
                            <input 
                                v-model="newNote" 
                                @keydown.enter.prevent="addNote" 
                                @keydown.comma.prevent="addNote"
                                type="text" 
                                class="bg-transparent focus:outline-none text-sm text-white flex-grow min-w-[100px] placeholder-gray-600" 
                                placeholder="Escribe y presiona Enter..."
                            >
                        </div>
                        <span v-if="errors.notas" class="text-xs text-red-400 block">{{ errors.notas }}</span>
                    </div>

                    <!-- Submit Action -->
                    <div class="pt-4">
                        <button 
                            type="submit" 
                            :disabled="isSubmitting"
                            class="w-full bg-gradient-to-r from-luxury-gold to-[#F5D061] text-deep-midnight font-bold uppercase tracking-[0.2em] py-5 rounded-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
                                <span class="animate-spin h-5 w-5 border-2 border-deep-midnight border-t-transparent rounded-full"></span>
                                Enviando...
                            </span>
                            <span v-else>Proponer Fragancia</span>
                        </button>
                        

                    </div>

                 </form>
            </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { proposePerfume } from '../services/productService'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useToastStore } from '@/stores/toastStore'

const previewImage = ref('')
const newNote = ref('')
const toastStore = useToastStore()

const validationSchema = toTypedSchema(
  z.object({
    nombre: z.string().min(1, 'Este campo es obligatorio').min(2, 'El nombre debe tener al menos 2 caracteres'),
    marca: z.string().min(1, 'Este campo es obligatorio').min(2, 'La marca debe tener al menos 2 caracteres'),
    gender: z.enum(['hombre', 'mujer', 'unisex'], { 
        errorMap: () => ({ message: 'Este campo es obligatorio' }) 
    }),
    tipo: z.string().min(1, 'Selecciona una opción válida'),
    description: z.string().min(1, 'Este campo es obligatorio').min(10, 'La descripción debe ser más detallada'),
    ml: z.union([z.string(), z.number()]).transform((val) => Number(val)).refine((val) => [25, 50, 100, 200].includes(val), { message: 'Selecciona una cantidad válida' }),
    concentracion: z.string().min(1, 'Este campo es obligatorio'),
    notas: z.array(z.string()).min(1, 'Agrega al menos una nota olfativa'),
    imagen: z.any().optional()
  })
)

const { handleSubmit, errors, defineField, isSubmitting, resetForm } = useForm({
  validationSchema,
  initialValues: {
    nombre: '',
    marca: '',
    gender: '',
    tipo: '',
    description: '',
    ml: 100,
    concentracion: '',
    notas: [],
    imagen: null
  }
})

const [nombre, nombreAttrs] = defineField('nombre')
const [marca, marcaAttrs] = defineField('marca')
const [gender, genderAttrs] = defineField('gender')
const [tipo, tipoAttrs] = defineField('tipo')
const [description, descriptionAttrs] = defineField('description')
const [ml, mlAttrs] = defineField('ml')
const [concentracion, concentracionAttrs] = defineField('concentracion')
const [notas] = defineField('notas')
const [imagen, imagenAttrs] = defineField('imagen') // Although handled manually in template mostly

const addNote = () => {
    const val = newNote.value.trim()
    const currentNotes = notas.value || []
    if (val && !currentNotes.includes(val)) {
        notas.value = [...currentNotes, val]
    }
    newNote.value = ''
}

const removeNote = (index) => {
    const currentNotes = [...(notas.value || [])]
    currentNotes.splice(index, 1)
    notas.value = currentNotes
}

const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        imagen.value = file
        previewImage.value = URL.createObjectURL(file)
    }
}

const submitProposal = handleSubmit(async (values) => {
    try {
        await proposePerfume(values)
        toastStore.addToast({
            message: '¡Propuesta enviada con éxito! Gracias por tu contribución.',
            type: 'success',
            duration: 5000
        })
        
        // Reset form
        resetForm()
        previewImage.value = ''
        
    } catch (error) {
        if (error.status === 401) {
            toastStore.addToast({
                message: 'No estás autorizado. Por favor, inicia sesión para proponer un perfume.',
                type: 'error',
                duration: 5000
            })
        } else {
            toastStore.addToast({
                message: 'Hubo un error al enviar la propuesta. Inténtalo de nuevo.',
                type: 'error',
                duration: 5000
            })
        }
    }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
