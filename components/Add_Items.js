import {useState} from "react";
export default function CreationForm (props) {
    const [nav, setNav] = useState("menu");
    switch(nav){
        case "menu":
            return(
                <div className="_add">
                        <button className="formbutton custom" onClick={() => {setNav("images")}}>Images</button>
                        <button className="formbutton custom" onClick={() => {setNav("websites")}}>Websites</button>
                </div>
            );
        case "images":
            return(
                <div className="_add">
                    <h1 className="_add-title">Upload SVG, PNG, JPG up to 5 MegaBytes.</h1>
                    <div style={{height: "100%", width: "100%"}}>
                        <section className="_add-section">
                            <p className="_add-section-p">Images/Graphics</p>
                            <form id="uploadimage" className="_add-section-form flex flex-center flex-column">
                                <label htmlFor="title">Title:</label>
                                <input className="_add-section-form-input" type="text" name="title" />
                                <label htmlFor="description">Description:</label>
                                <input className="_add-section-form-input" type="text" name="description" />
                                <label htmlFor="image">Image:</label>
                                <input className="_add-section-form-input" type="file" name="outerurl" />
                                <input type="hidden" name="type" value="image"/>
                                <input type="hidden" name="code" value=""/>
                                <button className="_add-section-form-button" type="submit" onClick={props.handleImageUpload}>Submit</button>
                            </form>
                            <button className="formbutton custom" onClick={() => {setNav("menu")}}>Go back</button>
                        </section>
                    </div>
                </div>
            );
        break;
        case "websites":
            return(
                <div className="_add">
                    <h1 className="_add-title">Upload SVG, PNG, JPG up to 5 MegaBytes.</h1>
                    <div style={{height: "100%", width: "100%"}}>
                        <section className="_add-section">
                            <p className="_add-section-p">Images/Graphics</p>
                            <form id="uploadimage" className="_add-section-form flex flex-center flex-column">
                                <label htmlFor="title">Title:</label>
                                <input className="_add-section-form-input" type="text" name="title" />
                                <label htmlFor="description">Description:</label>
                                <input className="_add-section-form-input" type="text" name="description" />
                                <label htmlFor="image">Image:</label>
                                <input className="_add-section-form-input" type="file" name="outerurl" />
                                <input type="hidden" name="type" value="image"/>
                                <input type="hidden" name="code" value=""/>
                                <button className="_add-section-form-button" type="submit" onClick={props.handleImageUpload}>Submit</button>
                            </form>
                            <button className="formbutton custom" onClick={() => {setNav("menu")}}>Go back</button>
                        </section>
                    </div>
                </div>
            );    
        break;

        default:
            return(
                <div className="_add">
                    <h1 className="_add-title">Upload SVG, PNG, JPG up to 5 MegaBytes.</h1>
                    <div style={{height: "100%", width: "100%"}}>
                        <section className="_add-section">
                            <p className="_add-section-p">Images/Graphics</p>
                            <form id="uploadimage" className="_add-section-form flex flex-center flex-column">
                                <label htmlFor="title">Title:</label>
                                <input className="_add-section-form-input" type="text" name="title" />
                                <label htmlFor="description">Description:</label>
                                <input className="_add-section-form-input" type="text" name="description" />
                                <label htmlFor="image">Image:</label>
                                <input className="_add-section-form-input" type="file" name="outerurl" />
                                <input type="hidden" name="type" value="image"/>
                                <input type="hidden" name="code" value=""/>
                                <button className="_add-section-form-button" type="submit" onClick={props.handleImageUpload}>Submit</button>
                            </form>
                        </section>
                    </div>
                </div>
            );
        break;
    }
    return(
        <div className="_add">
            <h1 className="_add-title">Upload SVG, PNG, JPG up to 5 MegaBytes.</h1>
            <div style={{height: "100%", width: "100%"}}>
                <section className="_add-section">
                    <p className="_add-section-p">Images/Graphics</p>
                    <form id="uploadimage" className="_add-section-form flex flex-center flex-column">
                        <label htmlFor="title">Title:</label>
                        <input className="_add-section-form-input" type="text" name="title" />
                        <label htmlFor="description">Description:</label>
                        <input className="_add-section-form-input" type="text" name="description" />
                        <label htmlFor="image">Image:</label>
                        <input className="_add-section-form-input" type="file" name="outerurl" />
                        <input type="hidden" name="type" value="image"/>
                        <input type="hidden" name="code" value=""/>
                        <button className="_add-section-form-button" type="submit" onClick={props.handleImageUpload}>Submit</button>
                    </form>
                </section>
                <section className="_add-section">
                    <p className="_add-section-p">Websites</p>
                    <form id="uploadwebsite" className="_add-section-form flex flex-center flex-column">
                        <label htmlFor="title">Title:</label>
                        <input className="_add-section-form-input" type="text" name="title"/>
                        <label htmlFor="description">Description:</label>
                        <input className="_add-section-form-input" type="text" name="description"/>
                        <label htmlFor="thumbnail">Thumbnail:</label>
                        <input className="_add-section-form-input" type="file" name="innerurl"/>
                        <label htmlFor="outerurl">Outer URL:</label>
                        <input className="_add-section-form-input" type="text" name="outerurl"/>
                        <label htmlFor="code">GitHub:</label>
                        <input className="_add-section-form-input" type="text" name="code"/>
                        <input type="hidden" name="type" value="website"/>
                        <button className="_add-section-form-button" type="submit" onClick={props.handleWebsiteUpload}>Submit</button>
                    </form>
                </section>
            </div>
        </div>
    )
}