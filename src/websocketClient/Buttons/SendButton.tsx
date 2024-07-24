import "../styles.css";

interface SendButtonProps {
  handleSendButton: () => void;
  isDisable: boolean;
}

const SendButton: React.FC<SendButtonProps> = ({
  handleSendButton,
  isDisable,
}) => {
  return (
    <button
      onClick={handleSendButton}
      className={`sendButton ${
        isDisable ? "disableButton" : "activeSendButton activeButton"
      }`}
      disabled={isDisable}
    >
      Enviar
    </button>
  );
};

export { SendButton };
