interface CookingStore {
  timeToCook: number;
  decrementTime: (value: number) => void;
  setTime: (value: number) => void;
  rotationAngle: number; // Угол поворота
  incrementAngle: (value: number) => void; // Метод увеличения угла
}
