import * as React from 'react';
import '../../public/styles/scss/Message.scss';

type MessageProps = {
    message: string;
};

export const Message = (props: MessageProps) => {
    return (
        <div className="message">
            <div className="message_box">
                <span>{props.message}</span>
            </div>
        </div>
    );
}