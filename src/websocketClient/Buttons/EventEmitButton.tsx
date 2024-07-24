import "../styles.css";

interface EventEmitButtonProps {
  handleEmitEventButton: () => void;
  disableEventEmit: boolean;
}

const EventEmitButton: React.FC<EventEmitButtonProps> = ({
  handleEmitEventButton,
  disableEventEmit,
}) => {
  return (
    <button
      onClick={handleEmitEventButton}
      className={`emitEventButton ${
        disableEventEmit
          ? "disableButton"
          : "activeEmitEventButton activeButton"
      }`}
      disabled={disableEventEmit}
    >
      Emitir Evento
    </button>
  );
};

export { EventEmitButton };
