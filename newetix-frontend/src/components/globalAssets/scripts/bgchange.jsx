import bangkok from '../images/bangkok.jpg';
import moscow from '../images/moscow.jpg';
import dubai from '../images/dubai.jpg';
import hochiminh from '../images/hochiminh.jpg';
import tokyo from '../images/tokyoNight.jpg'

function images() {
    const bg = [bangkok,moscow,dubai,hochiminh,tokyo];
    const random = Math.floor(Math.random() * bg.length);

    return(bg[random]);
}

export default images; 
