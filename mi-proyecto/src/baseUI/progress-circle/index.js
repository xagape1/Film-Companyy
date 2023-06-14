import './index.css'

const ProgressCircle = ({ percent }) => {

    return <div className="circulo">
        <svg width="34px" height="34px" viewBox='0 0 100 100' className='rotate'>
            <circle cx="52.5" cy="52.5" r="60"
                fill='transparent'
                stroke="white"
                strokeDasharray={500}
                className="scale">
            </circle>
        </svg>
        <div className='number'>
            {percent}
            <span className='percente'>%</span>
        </div>
    </div>
}
export default ProgressCircle;