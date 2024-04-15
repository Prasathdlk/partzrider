import { Spinner } from "react-bootstrap";

export default function SubmitButton(props){
    const { text } = props;
    // console.log('props::',props);
    return(
        <button {...props}>
                {
                   props.disabled && (
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    )
                }
                <span>{text}</span>
        </button>
    )
};
