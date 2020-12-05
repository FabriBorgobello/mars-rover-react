import Gallery from "react-grid-gallery"
import { useSelector } from "react-redux"
import { photosSelector } from "../slices/photos"
import * as React from "react"
import { Pagination } from "@material-ui/lab"

export const GridGallery = (paginate) => {
	const { photos } = useSelector(photosSelector)
	const [currentPage, setCurrentPage] = React.useState(1)

	// Normalize photos for Gallery
	const normalizePhotos = (photosArr) => {
		const filteredPhotos = []
		photosArr.forEach((photo) => {
			filteredPhotos.push({
				src: photo.img_src,
				thumbnail: photo.img_src,
				thumbnailWidth: 1000,
				thumbnailHeight: 1000,
			})
		})
		return filteredPhotos
	}

	// Pagination
	const photosPerPage = 25
	const indexOfLastPhoto = currentPage * photosPerPage
	const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage
	const currentPhotos = normalizePhotos(photos).slice(indexOfFirstPhoto, indexOfLastPhoto)
	const totalPages = Math.ceil(Number(photos.length) / photosPerPage)

	const handleChange = (event, value) => setCurrentPage(value)

	return (
		<div>
			<h3>Gallery</h3>
			<Gallery
				images={currentPhotos}
				enableImageSelection={false}
				backdropClosesModal={true}
				showCloseButton={false}
				showImageCount={false}
			/>
			<Pagination count={totalPages} page={currentPage} onChange={handleChange} />
		</div>
	)
}
