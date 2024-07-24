import "../styles.css";

interface DisconnetButtonProps {
  handleDisconnectButton: () => void;
  isDisable: boolean;
}

const DisconnectButton: React.FC<DisconnetButtonProps> = ({
  handleDisconnectButton,
  isDisable,
}) => {
  return (
    <button
      onClick={handleDisconnectButton}
      className={`disconnectButton ${
        isDisable ? "disableButton" : "activeDisconnectButton activeButton"
      }`}
    >
      Desconectar
    </button>
  );
};

export { DisconnectButton };
