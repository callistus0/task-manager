# Phase 2: Environment and Evaluation

---

## 🌐 Environment Setup

### Environment
- **Cloud Service**: Microsoft Azure  
  Used to deploy both frontend (via Azure Static Web Apps) and backend (via Azure App Services).  
  The PostgreSQL database is hosted using Azure Database for PostgreSQL Flexible Server.

### Backend
- **Node.js & Express**  
  Handles API logic and interacts with the PostgreSQL database.  
  Endpoints are used for task creation, updates, deletion, and retrieval.  
  🔗 **Backend URL**: [https://taskmanager-backend-callistus-fpaxf6h3gbf5exeh.northeurope-01.azurewebsites.net](https://taskmanager-backend-callistus-fpaxf6h3gbf5exeh.northeurope-01.azurewebsites.net)

### Frontend
- **React**  
  Built with create-react-app and deployed using Azure Static Web Apps.  
  Offers user interface for adding, filtering, and managing tasks.  
  🔗 **Frontend URL**: [https://wonderful-forest-08f165403.6.azurestaticapps.net](https://wonderful-forest-08f165403.6.azurestaticapps.net)

### Database
- **PostgreSQL**  
  Hosted on Azure with SSL enabled.  
  Stores task data including title and status (completed/pending).

---

## ✅ Evaluation Criteria Summary

| Evaluation Category | Technology/Service Used |
|---------------------|--------------------------|
| Environment         | Azure Cloud Platform     |
| Backend             | Node.js & Express        |
| Frontend            | React                    |
| Database            | PostgreSQL               |

---

## 📌 Deployment Notes

- CORS issues were resolved by configuring the backend to accept requests from the frontend domain.
- `.env` file stores sensitive credentials (not committed to GitHub).
- Logs are monitored via Azure Log Stream to debug connection errors and server issues.
