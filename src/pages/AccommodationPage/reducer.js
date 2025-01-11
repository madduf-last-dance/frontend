const accommodationPageReducer = (state, action) => {
  switch (action.type) {
    case 'manageModalVisible': 
      return {
        ...state, // Spread the existing state
        isManageModalVisible: true, // Update the specific field
      }
    case 'accommodation': 
      return {
        ...state,
        accommodation: action.payload.accommodation,
        availabilityList: action.payload.availabilityList,
      }
    case 'reservation':
      return {
        ...state,
        reservations: action.payload.reservations,
      }
    case 'manageModal':
        return {
          ...state,
          manageModal: action.payload.manageModal,
      }
    case 'selectedDates':
      return {
        ...state,
        selectedDates: action.payload.selectedDates,
    }
    case 'temporaryHighlight':
      return {
        ...state,
        temporaryHighlight: action.payload.temporaryHighlight,
    }
    case 'isAddingAvailability':
      return {
        ...state,
        isAddingAvailability: action.payload.isAddingAvailability,
    }  
    case 'isModalVisible':
      return {
        ...state,
        isModalVisible: action.payload.isModalVisible,
    }  
    case 'pricePerDay':
      return {
        ...state,
        pricePerDay: action.payload.pricePerDay,
    }  
    case 'availabilityList': 
      return {
        ...state,
        availabilityList: action.payload.availabilityList,
      }
    case 'isManageModalVisible': 
      return {
        ...state,
        isManageModalVisible: action.payload.isManageModalVisible,
      }
    case 'selectedReservation':
      return {
        ...state,
        selectedReservation: action.payload.selectedReservation,
      }
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export default accommodationPageReducer;
// const [accommodation, setAccommodation] = useState(null);
// const [modalVisible, setModalVisible] = useState(false);
// const [isModalVisible, setIsModalVisible] = useState(false);
// const [temporaryHighlight, setTemporaryHighlight] = useState([]);
// const [isAddingAvailability, setIsAddingAvailability] = useState(false);
// const [reservations, setReservations] = useState([]);
// const { accommodationId } = useParams();
// const [pricePerDay, setPricePerDay] = useState('');
// const [selectedDates, setSelectedDates] = useState({ start: null, end: null });
// const [selectedReservation, setSelectedReservation] = useState(null);
// const [availabilityList, setAvailabilityList] = useState(null);
// const [isManageModalVisible, setIsManageModalVisible] = useState(false)