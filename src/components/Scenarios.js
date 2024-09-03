export const predefinedScenarios = [
  {
    id: 1,
    name: "High Variance Model",
    metrics: {
      "Accuracy": 0.95,
      "Validation Accuracy": 0.75,
      "Loss": 0.1,
      "Validation Loss": 0.5,
      "Precision": 0.94,
      "Recall": 0.96,
      "F1 Score": 0.95,
    },
    correctTechniques: ["Regularization", "Data Augmentation", "Early Stopping"],
    targetImprovement: 100,
    currentImprovement: 0,
    appliedStrategies: [],
    description: "The model performs well on training data but poorly on validation data, indicating overfitting.",
    hintTexts: {
      "Regularization": "Consider using regularization techniques like L1 or L2 regularization. These methods add a penalty term to the loss function, discouraging the model from relying too heavily on any single feature and helping to reduce overfitting.",
      "Data Augmentation": "Try data augmentation to artificially increase the size and diversity of your training set. This can help the model generalize better to unseen data, reducing the gap between training and validation performance.",
      "Early Stopping": "Implement early stopping to prevent the model from overfitting. This technique involves monitoring the validation loss and stopping training when it starts to increase, helping to find the optimal point between underfitting and overfitting."
    }
  },
  {
    id: 2,
    name: "High Bias Model",
    metrics: {
      "Accuracy": 0.65,
      "Validation Accuracy": 0.64,
      "Loss": 0.4,
      "Validation Loss": 0.41,
      "Precision": 0.66,
      "Recall": 0.64,
      "F1 Score": 0.65,
    },
    correctTechniques: ["Increase Model Complexity", "Feature Engineering", "Ensemble Methods"],
    targetImprovement: 100,
    currentImprovement: 0,
    appliedStrategies: [],
    description: "The model performs similarly on both training and validation data, but poorly overall, suggesting underfitting.",
    hintTexts: {
      "Increase Model Complexity": "Try increasing the model's complexity by adding more layers or neurons if it's a neural network, or considering a more sophisticated algorithm. This can help the model capture more complex patterns in the data.",
      "Feature Engineering": "Look into feature engineering to create new, more informative features or transform existing ones. This can help the model capture important relationships in the data that it's currently missing.",
      "Ensemble Methods": "Consider using ensemble methods like Random Forests or Gradient Boosting. These techniques combine multiple models, often improving overall performance and reducing bias."
    }
  },
  {
    id: 3,
    name: "Imbalanced Dataset",
    metrics: {
      "Accuracy": 0.90,
      "Validation Accuracy": 0.89,
      "Loss": 0.25,
      "Validation Loss": 0.26,
      "Precision": 0.95,
      "Recall": 0.20,
      "F1 Score": 0.33,
    },
    correctTechniques: ["Resampling", "Class Weighting", "SMOTE"],
    targetImprovement: 100,
    currentImprovement: 0,
    appliedStrategies: [],
    description: "High accuracy and precision, but low recall and F1 score suggest an imbalanced dataset.",
    hintTexts: {
      "Resampling": "Try resampling techniques to balance your dataset. This could involve oversampling the minority class or undersampling the majority class, helping the model learn equally from all classes.",
      "Class Weighting": "Consider applying class weights inversely proportional to their frequencies. This technique gives more importance to the minority class during training, helping to address the imbalance.",
      "SMOTE": "Look into Synthetic Minority Over-sampling Technique (SMOTE). This method creates synthetic examples of the minority class, increasing its representation in the dataset and helping the model learn its characteristics better."
    }
  },
  {
    id: 4,
    name: "Noisy Data",
    metrics: {
      "Accuracy": 0.70,
      "Validation Accuracy": 0.68,
      "Loss": 0.45,
      "Validation Loss": 0.47,
      "Precision": 0.72,
      "Recall": 0.69,
      "F1 Score": 0.70,
    },
    correctTechniques: ["Data Cleaning", "Robust Loss Functions", "Ensemble Methods"],
    targetImprovement: 100,
    currentImprovement: 0,
    appliedStrategies: [],
    description: "The model's performance is mediocre across all metrics, possibly due to noisy or mislabeled data.",
    hintTexts: {
      "Data Cleaning": "Focus on data cleaning techniques. This might involve removing outliers, correcting mislabeled data, or filling in missing values. Clean data can significantly improve model performance.",
      "Robust Loss Functions": "Consider using robust loss functions like Huber loss or log-cosh loss. These are less sensitive to outliers and can help the model perform better in the presence of noisy data.",
      "Ensemble Methods": "Try ensemble methods like Random Forests or Gradient Boosting. These techniques can often handle noisy data better than single models by aggregating predictions from multiple models."
    }
  },
  {
    id: 5,
    name: "Multiclass Classification Challenge",
    metrics: {
      "Accuracy": 0.82,
      "Validation Accuracy": 0.80,
      "Loss": 0.30,
      "Validation Loss": 0.32,
      "Precision": 0.83,
      "Recall": 0.81,
      "F1 Score": 0.82,
    },
    correctTechniques: ["Hierarchical Classification", "One-vs-Rest Strategy", "Error Analysis"],
    targetImprovement: 100,
    currentImprovement: 0,
    appliedStrategies: [],
    description: "A multiclass classification problem with decent overall performance, but room for improvement in specific classes.",
    hintTexts: {
      "Hierarchical Classification": "Consider implementing a hierarchical classification approach. This involves breaking down the classification task into a tree-like structure of simpler sub-tasks, which can be especially effective for a large number of classes or when some classes are similar.",
      "One-vs-Rest Strategy": "Try using a One-vs-Rest (OvR) strategy. This involves training a separate binary classifier for each class, which can sometimes capture class-specific features better than a single multiclass classifier.",
      "Error Analysis": "Perform detailed error analysis. Look at the confusion matrix to identify which classes are often misclassified. This can guide you in feature engineering or data collection efforts focused on the problematic classes."
    }
  }
];