---
title: Markdown page example
---

### Example 2: Predicting Exam Scores
**Scenario:** A teacher wants to predict a student's final exam score based on the number of hours they studied.

**Data:** The teacher collects data on the number of study hours and the corresponding exam scores of students.

**Regression Model:** A simple linear regression model where the number of study hours is the independent variable (X) and the exam score is the dependent variable (Y).

**Use Case:**
```python
import numpy as np
from sklearn.linear_model import LinearRegression

# Example data
study_hours = np.array([5, 10, 15, 20, 25, 30]).reshape(-1, 1)
exam_scores = np.array([50, 60, 70, 80, 90, 100])

# Create and fit the model
model = LinearRegression()
model.fit(study_hours, exam_scores)

# Predict the exam score for a student who studied 18 hours
predicted_score = model.predict([[18]])
print(f"Predicted exam score for 18 hours of study: {predicted_score[0]:.2f}")
```

### Example 3: Predicting Sales Based on Advertising Spend
**Scenario:** A marketing manager wants to predict the sales revenue based on the amount spent on advertising.

**Data:** The manager collects data on the advertising spend (in dollars) and the corresponding sales revenue.

**Regression Model:** A simple linear regression model where the advertising spend is the independent variable (X) and the sales revenue is the dependent variable (Y).

**Use Case:**
```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

# Example data
ad_spend = np.array([1000, 1500, 2000, 2500, 3000]).reshape(-1, 1)
sales = np.array([20000, 25000, 30000, 35000, 40000])

# Create and fit the model
model = LinearRegression()
model.fit(ad_spend, sales)

# Predict the sales for $1800 spent on advertising
predicted_sales = model.predict([[1800]])
print(f"Predicted sales for $1800 advertising spend: ${predicted_sales[0]:,.2f}")

# Plotting the results
plt.scatter(ad_spend, sales, color='green')
plt.plot(ad_spend, model.predict(ad_spend), color='orange')
plt.xlabel('Advertising Spend ($)')
plt.ylabel('Sales Revenue ($)')
plt.title('Advertising Spend vs Sales Revenue')
plt.show()
```

In each of these examples, the linear regression model helps predict the dependent variable (price, exam score, sales revenue) based on the independent variable (house size, study hours, advertising spend).
