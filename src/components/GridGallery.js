import Gallery from "react-grid-gallery"
import * as React from "react"
import { Pagination } from "@material-ui/lab"

export const GridGallery = ({ photos }) => {
	const [currentPage, setCurrentPage] = React.useState(1)

	// Pagination
	const photosPerPage = 25
	const indexOfLastPhoto = currentPage * photosPerPage
	const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage
	const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto)
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
