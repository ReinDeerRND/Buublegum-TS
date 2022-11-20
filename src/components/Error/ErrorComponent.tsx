
const ErrorComponent: React.FC<any> = (props) => {
    let error = props.match.params?.error;
    let errorMessage = '';
    switch (error) {
        case 'noprofile':
            errorMessage = 'Error: page with this profile ID was not found'
            break;
        default:
            errorMessage = 'Error 404: this page was not found'
            break;
    }

    return <div> {errorMessage} </div>
}
export default ErrorComponent;