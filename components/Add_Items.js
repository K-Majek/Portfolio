export default function CreationForm (props) {
    return(
        <div className="margin-auto">
            <h1 className="text-center">Upload SVG, PNG, JPG up to 5 MegaBytes.</h1>
            <p className="text-center">Images/Graphics</p>
            <form id="uploadimage" className="flex flex-center flex-column">
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" />
                <label htmlFor="description">Description:</label>
                <input type="text" name="description" />
                <label htmlFor="image">Image:</label>
                <input type="file" name="image" />
                <label htmlFor="thumbnail">Image thumbnail</label>
                <input type="file" name="thumbnail" />
                <button type="submit" onClick={props.handleImageUpload}>Submit</button>
            </form>
            <p className="text-center">Websites</p>
            <form id="uploadwebsite" className="flex flex-center flex-column">
                <label htmlFor="title">Title:</label>
                <input type="text" name="title"/>
                <label htmlFor="description">Description:</label>
                <input type="text" name="description"/>
                <label htmlFor="thumbnail">Thumbnail:</label>
                <input type="file" name="thumbnail"/>
                <label htmlFor="outerurl">Outer URL:</label>
                <input type="text" name="outerurl"/>
                <label htmlFor="code">GitHub:</label>
                <input type="text" name="code"/>
                <button type="submit" onClick={props.handleWebsiteUpload}>Submit</button>
            </form>
        </div>
    )
}