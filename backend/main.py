from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict
from datetime import datetime
import uuid
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# --- Rolling Stock Engineer ---

class RollingStockChecklist(BaseModel):
    fitness_certificates: bool = False
    component_wear: bool = False
    mileage: bool = False

class RollingStockData(BaseModel):
    checklist: RollingStockChecklist
    inspection_alerts: List[str]
    scheduled_maintenance: List[str]
    special_notes: List[str]

# In-memory database
rolling_stock_db: Dict[str, RollingStockData] = {
    "train_001": RollingStockData(
        checklist=RollingStockChecklist(fitness_certificates=True, component_wear=False, mileage=True),
        inspection_alerts=["Brake pad wear at 70%", "Window crack on car 3"],
        scheduled_maintenance=["HVAC filter replacement due in 1 week"],
        special_notes=["Vandalism reported on car 2, awaiting cleaning"]
    )
}

@app.get("/api/rollingstock/{train_id}", response_model=RollingStockData)
def get_rolling_stock_data(train_id: str):
    """
    Retrieves all data for the Rolling Stock Engineer dashboard for a specific train.
    """
    return rolling_stock_db.get(train_id, RollingStockData(
        checklist=RollingStockChecklist(),
        inspection_alerts=[],
        scheduled_maintenance=[],
        special_notes=[]
    ))

@app.post("/api/rollingstock/{train_id}", response_model=RollingStockData)
def update_rolling_stock_data(train_id: str, data: RollingStockData):
    """
    Updates all data for the Rolling Stock Engineer dashboard for a specific train.
    """
    rolling_stock_db[train_id] = data
    return data

# --- Signalling System ---

class SignallingStatus(BaseModel):
    track_communication_stable: bool = True
    safety_limits_operational: bool = True
    no_errors_detected: bool = True

signalling_status_db = SignallingStatus()

@app.get("/api/signalling/status", response_model=SignallingStatus)
def get_signalling_status():
    """
    Retrieves the current status of the signalling system.
    """
    return signalling_status_db

@app.post("/api/signalling/status", response_model=SignallingStatus)
def update_signalling_status(status: SignallingStatus):
    """
    Updates the status of the signalling system.
    """
    global signalling_status_db
    signalling_status_db = status
    return status

# --- Telecom / Communication ---

class TelecomStatus(BaseModel):
    voice_data_functional: bool = True
    emergency_comm_operational: bool = True
    no_interference_detected: bool = True

telecom_status_db = TelecomStatus()

@app.get("/api/telecom/status", response_model=TelecomStatus)
def get_telecom_status():
    """
    Retrieves the current status of the telecom system.
    """
    return telecom_status_db

@app.post("/api/telecom/status", response_model=TelecomStatus)
def update_telecom_status(status: TelecomStatus):
    """
    Updates the status of the telecom system.
    """
    global telecom_status_db
    telecom_status_db = status
    return status

# --- Cleaning Lead ---

class CleaningStatus(BaseModel):
    interior_cleaning: bool = False
    pest_control: bool = False
    exterior_cleaning: bool = False

cleaning_status_db: Dict[str, CleaningStatus] = {
    "train_001": CleaningStatus(interior_cleaning=True, pest_control=True, exterior_cleaning=False)
}

@app.get("/api/cleaning/{train_id}/status", response_model=CleaningStatus)
def get_cleaning_status(train_id: str):
    """
    Retrieves the cleaning status for a specific train.
    """
    return cleaning_status_db.get(train_id, CleaningStatus())

@app.post("/api/cleaning/{train_id}/status", response_model=CleaningStatus)
def update_cleaning_status(train_id: str, status: CleaningStatus):
    """
    Updates the cleaning status for a specific train.
    """
    cleaning_status_db[train_id] = status
    return status

# --- Depot Operations / Yard Master ---

class YardInput(BaseModel):
    tracks: int
    trainsets: List[str]

class YardPlan(BaseModel):
    suggested_map: Dict[str, str]
    service: List[str]
    standby: List[str]
    maintenance: List[str]

yard_plan_db: Dict[str, YardPlan] = {}

@app.post("/api/yard/plan", response_model=YardPlan)
def create_yard_plan(yard_input: YardInput):
    """
    Creates a suggested yard plan based on the number of tracks and trainsets.
    """
    service = []
    standby = []
    maintenance = []
    # Simple round-robin assignment for demonstration
    for i, train in enumerate(yard_input.trainsets):
        if i % 3 == 0:
            service.append(train)
        elif i % 3 == 1:
            standby.append(train)
        else:
            maintenance.append(train)
    
    suggested_map = {}
    # Simple track assignment
    for i, train in enumerate(yard_input.trainsets):
        if i < yard_input.tracks:
            suggested_map[f"track_{i+1}"] = train
        else:
            # Not enough tracks for all trains
            pass

    plan = YardPlan(suggested_map=suggested_map, service=service, standby=standby, maintenance=maintenance)
    yard_plan_db["current_plan"] = plan
    return plan

@app.put("/api/yard/plan", response_model=YardPlan)
def update_yard_plan(plan: YardPlan):
    """
    Allows the Yard Master to override and save a modified yard plan.
    """
    yard_plan_db["current_plan"] = plan
    return plan

# --- Branding ---

class BrandingCampaignCreate(BaseModel):
    brand_name: str
    ad_content: str
    start_date: datetime
    end_date: datetime

class BrandingCampaign(BrandingCampaignCreate):
    campaign_id: str

branding_campaigns_db: Dict[str, BrandingCampaign] = {}

@app.post("/api/branding/campaigns", response_model=BrandingCampaign)
def create_branding_campaign(campaign: BrandingCampaignCreate):
    """
    Creates a new branding campaign.
    """
    campaign_id = str(uuid.uuid4())
    new_campaign = BrandingCampaign(campaign_id=campaign_id, **campaign.dict())
    branding_campaigns_db[campaign_id] = new_campaign
    return new_campaign

@app.get("/api/branding/campaigns", response_model=List[BrandingCampaign])
def get_branding_campaigns():
    """
    Retrieves all branding campaigns.
    """
    return list(branding_campaigns_db.values())

@app.get("/")
def read_root():
    return {"message": "FastAPI backend is running"}