export default function Videos (props){
    return`
    <header>
        <h1>Saved Video's</h1>
    </header>    
 <main>
    <div>
    ${props.video.map(video => `
        <div class="row g-3"> 
            <input>
    
    `).join('')}
    </div>
</main>
    `;
}

export function videoEvents(){

}