import Gallery from "react-grid-gallery"
import * as React from "react"
import { Pagination } from "@material-ui/lab"
import { useSelector } from "react-redux"
import { photosSelector } from "../slices/photos"

export const GridGallery = ({ photos }) => {
	const [currentPage, setCurrentPage] = React.useState(1)
	const { loading, hasErrors } = useSelector(photosSelector)

	// Pagination
	const photosPerPage = 25
	const indexOfLastPhoto = currentPage * photosPerPage
	const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage
	const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto)
	const totalPages = Math.ceil(Number(photos.length) / photosPerPage)

	const handleChange = (event, value) => setCurrentPage(value)

	return (
		<div className='gallery'>
			<h2>Gallery</h2>
			<hr />
			{loading && <div>Loading...</div>}
			{hasErrors && <div>There has been an error processing your request</div>}
			<Gallery
				margin={10}
				images={currentPhotos}
				enableImageSelection={false}
				backdropClosesModal={true}
				showCloseButton={false}
				showImageCount={false}
			/>
			{totalPages !== 1 && (
				<div className='pagination'>
					<Pagination count={totalPages} page={currentPage} onChange={handleChange} variant='text' color='primary' size='large' />
				</div>
			)}
		</div>
	)
}
