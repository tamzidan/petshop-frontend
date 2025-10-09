import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { PawPrint, Plus, Edit2, Trash2, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  adminGetPets,
  adminCreatePet,
  adminUpdatePet,
  adminDeletePet
} from '../../services/api';
import type { Pet } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';

const petSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  image: z.any().optional()
});

type PetFormData = z.infer<typeof petSchema>;

const Pets = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState<Pet[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<PetFormData>({
    resolver: zodResolver(petSchema)
  });

  useEffect(() => {
    if (!isAdmin) {
      toast.error('Access denied. Admin only.');
      navigate('/');
      return;
    }

    loadPets();
  }, [isAdmin, navigate]);

  const loadPets = async () => {
    try {
      setLoading(true);
      const data = await adminGetPets();
      setPets(data);
    } catch (error) {
      console.error('Error loading pets:', error);
      toast.error('Failed to load pets');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (pet?: Pet) => {
    if (pet) {
      setEditingPet(pet);
      reset({
        name: pet.name,
        description: pet.description || ''
      });
      setImagePreview(pet.image_url || null);
    } else {
      setEditingPet(null);
      reset({ name: '', description: '' });
      setImagePreview(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPet(null);
    reset();
    setImagePreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: PetFormData) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      if (data.description) {
        formData.append('description', data.description);
      }

      const imageInput = document.querySelector('input[name="image"]') as HTMLInputElement;
      if (imageInput?.files?.[0]) {
        formData.append('image', imageInput.files[0]);
      }

      if (editingPet) {
        await adminUpdatePet(editingPet.id, formData);
        toast.success('Pet updated successfully');
      } else {
        await adminCreatePet(formData);
        toast.success('Pet created successfully');
      }

      closeModal();
      loadPets();
    } catch (error: any) {
      console.error('Error saving pet:', error);
      toast.error(error.response?.data?.message || 'Failed to save pet');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await adminDeletePet(id);
      toast.success('Pet deleted successfully');
      setDeleteConfirm(null);
      loadPets();
    } catch (error: any) {
      console.error('Error deleting pet:', error);
      toast.error(error.response?.data?.message || 'Failed to delete pet');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-400 to-primary-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <PawPrint className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Manage Pets</h1>
            </div>
            <button
              onClick={() => openModal()}
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Pet</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Pets Grid */}
        {pets.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <PawPrint className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No pets yet</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first pet type</p>
            <button
              onClick={() => openModal()}
              className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              Add New Pet
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <div key={pet.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Pet Image */}
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {pet.image_url ? (
                    <img
                      src={pet.image_url}
                      alt={pet.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <PawPrint className="w-16 h-16 text-gray-400" />
                  )}
                </div>

                {/* Pet Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pet.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {pet.description || 'No description'}
                  </p>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openModal(pet)}
                      className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(pet.id)}
                      className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>

                {/* Delete Confirmation */}
                {deleteConfirm === pet.id && (
                  <div className="bg-red-50 border-t border-red-200 p-4">
                    <p className="text-sm text-red-800 font-medium mb-3">
                      Are you sure you want to delete this pet?
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDelete(pet.id)}
                        className="flex-1 bg-red-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-red-700"
                      >
                        Yes, Delete
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="flex-1 bg-gray-300 text-gray-700 px-3 py-2 rounded text-sm font-medium hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-primary-500 text-white p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingPet ? 'Edit Pet' : 'Add New Pet'}
              </h2>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6">
              {/* Name Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pet Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('name')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Dogs, Cats, Birds"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Description Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Brief description of this pet type"
                />
              </div>

              {/* Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image
                </label>
                <input
                  type="file"
                  {...register('image')}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {imagePreview && (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors disabled:bg-gray-400"
                >
                  {isSubmitting ? 'Saving...' : editingPet ? 'Update Pet' : 'Create Pet'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pets;
