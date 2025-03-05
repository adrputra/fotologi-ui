import { create } from 'zustand';

interface StudioStore {
  selectedImage: number;
  setSelectedImage: (index: number) => void;
  imageList: File[];
  setImageList: (imageList: File[]) => void;
  deleteImage: (index: number) => void;
}

export const useStudioStore = create<StudioStore>()((set) => ({
  selectedImage: 0,
  setSelectedImage: (index: number) => set({ selectedImage: index }),
  imageList: [],
  setImageList: (imageList: File[]) => set({ imageList }),
  deleteImage: (index: number) =>
    set((state) => ({
      selectedImage: 0,
      imageList: state.imageList.filter((_, i) => i !== index),
    })),
}));
