import Gallery from "react-grid-gallery"
import { useSelector } from "react-redux"
import { photosSelector } from "../slices/photos"

export const GridGallery = () => {
	const { photos } = useSelector(photosSelector)

	// Normalize photos for Gallery
	const normalizePhotos = () => {
		const filteredPhotos = []
		photos.forEach((photo) => {
			filteredPhotos.push({
				src: photo.img_src,
				thumbnail: photo.img_src,
				thumbnailWidth: 1000,
				thumbnailHeight: 1000,
			})
		})
		return filteredPhotos
	}
	return (
		<Gallery
			images={normalizePhotos()}
			enableImageSelection={false}
			backdropClosesModal={true}
			showCloseButton={false}
			showImageCount={false}
		/>
	)
}
