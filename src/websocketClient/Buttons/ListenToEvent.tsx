import "../styles.css";

interface ListenToEventProps {
  handleListenToEventButton: () => void;
  disableEventEmit: boolean;
}

const ListenToEventButton: React.FC<ListenToEventProps> = ({
  handleListenToEventButton,
  disableEventEmit,
}) => {
  return (
    <button
      onClick={handleListenToEventButton}
      className={`listenToEventButton ${
        disableEventEmit
          ? "disableButton"
          : "activeListenToEventButton activeButton"
      }`}
      disabled={disableEventEmit}
    >
      Ouvir Evento
    </button>
  );
};

export { ListenToEventButton };
