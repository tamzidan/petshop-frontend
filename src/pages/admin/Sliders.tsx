import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Image, Plus, Edit2, Trash2, X, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  adminGetSliders,
  adminCreateSlider,
  adminUpdateSlider,
  adminDeleteSlider
} from '../../services/api';
import type { Slider } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';

const sliderSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  link_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  is_active: z.boolean(),
  order: z.string().min(1, 'Order is required'),
  image: z.any().optional()
});

type SliderFormData = z.infer<typeof sliderSchema>;

const Sliders = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlider, setEditingSlider] = useState<Slider | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<SliderFormData>({
    resolver: zodResolver(sliderSchema),
    defaultValues: {
      is_active: true,
      order: '0'
    }
  });

  const isActive = watch('is_active');

  useEffect(() => {
    if (!isAdmin) {
      toast.error('Access denied. Admin only.');
      navigate('/');
      return;
    }

    loadData();
  }, [isAdmin, navigate]);

  const loadData = async () => {
    try {
      setLoading(true);
      const slidersData = await adminGetSliders();
      setSliders(slidersData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (slider?: Slider) => {
    if (slider) {
      setEditingSlider(slider);
      reset({
        title: slider.title,
        description: slider.description || '',
        link_url: slider.link_url || '',
        is_active: slider.is_active,
        order: slider.order.toString()
      });
      setImagePreview(slider.image_url || null);
    } else {
      setEditingSlider(null);
      reset({
        title: '',
        description: '',
        link_url: '',
        is_active: true,
        order: '0'
      });
      setImagePreview(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSlider(null);
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

  const onSubmit = async (data: SliderFormData) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      if (data.description) formData.append('description', data.description);
      if (data.link_url) formData.append('link_url', data.link_url);
      formData.append('is_active', data.is_active ? '1' : '0');
      formData.append('order', data.order);

      const imageInput = document.querySelector('input[name="image"]') as HTMLInputElement;
      if (imageInput?.files?.[0]) {
        formData.append('image', imageInput.files[0]);
      }

      if (editingSlider) {
        await adminUpdateSlider(editingSlider.id, formData);
        toast.success('Slider updated successfully');
      } else {
        await adminCreateSlider(formData);
        toast.success('Slider created successfully');
      }

      closeModal();
      loadData();
    } catch (error: any) {
      console.error('Error saving slider:', error);
      toast.error(error.response?.data?.message || 'Failed to save slider');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await adminDeleteSlider(id);
      toast.success('Slider deleted successfully');
      setDeleteConfirm(null);
      loadData();
    } catch (error: any) {
      console.error('Error deleting slider:', error);
      toast.error(error.response?.data?.message || 'Failed to delete slider');
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
              <Image className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Manage Sliders</h1>
            </div>
            <button
              onClick={() => openModal()}
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Slider</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sliders Table */}
        {sliders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No sliders yet</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first slider</p>
            <button
              onClick={() => openModal()}
              className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              Add New Slider
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Slider
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Link
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sliders.map((slider) => (
                    <>
                      <tr key={slider.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-16 w-24 flex-shrink-0 mr-4">
                              {slider.image_url ? (
                                <img
                                  src={slider.image_url}
                                  // alt={slider.title}
                                  className="h-16 w-24 rounded object-cover"
                                />
                              ) : (
                                <div className="h-16 w-24 rounded bg-gray-200 flex items-center justify-center">
                                  <Image className="w-8 h-8 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {slider.title}
                              </div>
                              <div className="text-sm text-gray-500 max-w-xs truncate">
                                {slider.description || 'No description'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            {slider.order}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {slider.is_active ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Inactive
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {slider.link_url ? (
                            <a
                              href={slider.link_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-900 text-sm"
                            >
                              View Link
                            </a>
                          ) : (
                            <span className="text-gray-400 text-sm">No link</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openModal(slider)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(slider.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {deleteConfirm === slider.id && (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 bg-red-50">
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-red-800 font-medium">
                                Are you sure you want to delete "{slider.title}"?
                              </p>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleDelete(slider.id)}
                                  className="px-4 py-2 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700"
                                >
                                  Yes, Delete
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(null)}
                                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-400"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-primary-500 text-white p-6 flex items-center justify-between sticky top-0">
              <h2 className="text-xl font-bold">
                {editingSlider ? 'Edit Slider' : 'Add New Slider'}
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
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('title')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Summer Sale 2024"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    {...register('description')}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Brief description of the slider"
                  />
                </div>

                {/* Link URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link URL (Optional)
                  </label>
                  <input
                    type="url"
                    {...register('link_url')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://example.com"
                  />
                  {errors.link_url && (
                    <p className="text-red-500 text-sm mt-1">{errors.link_url.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Order */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      {...register('order')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="0"
                    />
                    {errors.order && (
                      <p className="text-red-500 text-sm mt-1">{errors.order.message}</p>
                    )}
                  </div>

                  {/* Active Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <button
                      type="button"
                      onClick={() => setValue('is_active', !isActive)}
                      className={`w-full px-4 py-2 border rounded-lg flex items-center justify-center space-x-2 transition-colors ${
                        isActive
                          ? 'bg-green-50 border-green-300 text-green-700'
                          : 'bg-red-50 border-red-300 text-red-700'
                      }`}
                    >
                      {isActive ? (
                        <>
                          <Eye className="w-5 h-5" />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-5 h-5" />
                          <span>Inactive</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slider Image {!editingSlider && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="file"
                    {...register('image')}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended: 1920x600px (16:5 aspect ratio)
                  </p>
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
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors disabled:bg-gray-400"
                >
                  {isSubmitting ? 'Saving...' : editingSlider ? 'Update Slider' : 'Create Slider'}
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

export default Sliders;
