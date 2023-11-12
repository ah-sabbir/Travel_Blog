import { CreateGalleryInput } from "./create-gallery.dto";

export interface EditGalleryInput extends CreateGalleryInput {
  galleryId: string;
}
