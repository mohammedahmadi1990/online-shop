import "./categories.styles.scss";

const App = () => {
  const category = [
    { id: 1, title: "Hats" },
    { id: 2, title: "Jackets" },
    { id: 3, title: "Sneakers" },
    { id: 4, title: "Women" },
    { id: 5, title: "Men" },
  ];
  return (
    <div class="categories-container">
      {category.map(({ title }) => (
        <div class="category-container">
          <dive class="background-image" />
          <div class="category-body-container">
            <h2>{title}</h2>
            <p>Shop Now</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
