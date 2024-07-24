import "../styles.css";

interface ConnectButtonProps {
  handleConnectionButton: () => void;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({
  handleConnectionButton,
}) => {
  return (
    <>
      <button
        onClick={handleConnectionButton}
        className="connectButton activeButton">
        Conectar
      </button>
    </>
  );
};


export { ConnectButton };
