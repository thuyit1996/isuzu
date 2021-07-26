<template>
  <div>
    <div class="compare-model-button text-center" v-if="compareModelList && compareModelList.length">
      <sc-text tag="div" :field="carComparisonModel.SubmitButtonTitle" class="i-btn i-btn__primary--none-active ripple" @click="showInformation"></sc-text>
    </div>
    <div class="car-comparision car-comparision--information" :class="{'show-info': showInfo}" role="tablist">
      <div class="container container-extra" v-if="listGroupNameRender && listGroupNameRender.length">
        <!-- <div role="tab">
          <sc-text tag="p" class="car-comparision__card__header__button car-comparision-collapse" :field="carComparisonModel.MinimizeTitle"  v-b-toggle="'collapse-main'"/>
        </div> -->
        <b-collapse role="tabpanel" v-bind:id="'collapse-main'" visible>
          <div v-for="(item, index) in listGroupNameRender" :key="index" class="list-group-name">
          <div class="car-comparision__card">
            <div class="car-comparision__card__header" role="tab" @click="scrollToParentCollapse($event)">
              <sc-text v-if="item == 'Equipment'" tag="div" class="car-comparision__card__header__button list-group-name__title"  v-b-toggle="'collapse-parent-' +(index + 1)" :field="getTitleField('EquipmentTitle')"/>
              <sc-text v-else-if="item == 'Technical'" tag="div" class="car-comparision__card__header__button list-group-name__title" v-b-toggle="'collapse-parent-' +(index + 1)" :field="getTitleField('TechnicalTitle')"/>
            </div>
            <b-collapse class="car-comparision__card__body" accordion="parent-accordion" role="tabpanel" v-bind:id="'collapse-parent-' +(index + 1)" :visible="index == 0">
              <div v-for="(itemChild, index) in listPropertiesNameRender" :key="index" role="tab">
                <b-card v-if="itemChild.name == 'DimensionCapacity'  && itemChild.parentName == item" no-body class="car-comparision__card">
                  <b-card-header header-tag="header" class="car-comparision__card__header" role="tab"  @click="scrollToCollapse($event)">
                    <sc-text block class="car-comparision__card__header__button"  v-b-toggle.accordion-7 variant="info" tag="div" :field="getTitleField('DimensionCapacityTitle')"/>
                  </b-card-header>
                  <b-collapse class="car-comparision__card__body" accordion="my-accordion" role="tabpanel" id="accordion-7" :visible="index == 0">
                    <div class="car-comparision__card__body__content">
                      <div class="container container-extra">
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.VehicleDimension" :compareModelList="compareModelList"  :parent="'DimensionCapacity'" :type="'VehicleDimension'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.CargoDimension" :compareModelList="compareModelList" :parent="'DimensionCapacity'" :type="'CargoDimension'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.Wheelbase" :compareModelList="compareModelList" :parent="'DimensionCapacity'" :type="'Wheelbase'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.FrontRearTread" :compareModelList="compareModelList" :parent="'DimensionCapacity'" :type="'FrontRearTread'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.MinimumGroundClearance" :compareModelList="compareModelList" :parent="'DimensionCapacity'" :type="'MinimumGroundClearance'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.VehicleWeight" :compareModelList="compareModelList" :parent="'DimensionCapacity'" :type="'ApproximateVehicleWeight'" :groupType="'Technical'"/>
                      </div>
                    </div>
                  </b-collapse>
                </b-card>
                <b-card v-if="itemChild.name === 'Engine' && itemChild.parentName == item" no-body class="car-comparision__card" ref="engineElement">
                  <b-card-header header-tag="header" class="car-comparision__card__header" role="tab"  @click="scrollToCollapse($event)">
                    <sc-text href="#" class="car-comparision__card__header__button"  v-b-toggle.accordion-1 variant="info" tag="div" :field="getTitleField('EngineTitle')"/>
                  </b-card-header>
                  <b-collapse class="car-comparision__card__body"  accordion="my-accordion" role="tabpanel" id="accordion-1" :visible="index == 0">
                    <div class="car-comparision__card__body__content">
                      <div class="container container-extra">
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.CarModel" :compareModelList="compareModelList" :parent="'Engine'" :type="'Model'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.CarType" :compareModelList="compareModelList" :parent="'Engine'" :type="'Type'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.EngineDisplacement" :compareModelList="compareModelList" :parent="'Engine'" :type="'EngineDisplacement'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.BoreWidthStroke" :compareModelList="compareModelList" :parent="'Engine'" :type="'BoreWidthStroke'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.CompressionRatio" :compareModelList="compareModelList" :parent="'Engine'" :type="'CompressionRatio'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.MaximumPower" :compareModelList="compareModelList" :parent="'Engine'" :type="'MaximumPower'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.EngineMaximumTorque" :compareModelList="compareModelList" :parent="'Engine'" :type="'MaximumTorque'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.Fuel" :compareModelList="compareModelList" :parent="'Engine'" :type="'Fuel'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.FuelTankCapacity" :compareModelList="compareModelList" :parent="'Engine'" :type="'FuelTankCapacity'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.IssSystem" :compareModelList="compareModelList" :parent="'Engine'" :type="'IssSystem'" :groupType="'Technical'"/>
                      </div>
                    </div>
                  </b-collapse>
                </b-card>
                <b-card v-else-if="itemChild.name == 'TransmissionSystem'  && itemChild.parentName == item" no-body class="car-comparision__card">
                  <b-card-header header-tag="header" class="car-comparision__card__header" role="tab"  @click="scrollToCollapse($event)">
                    <sc-text block class="car-comparision__card__header__button"  v-b-toggle.accordion-2 variant="info" tag="div" :field="getTitleField('TransimissionSystemTitle')"/>
                  </b-card-header>
                  <b-collapse class="car-comparision__card__body" accordion="my-accordion" role="tabpanel" id="accordion-2" :visible="index == 0">
                    <div class="car-comparision__card__body__content">
                      <div class="container container-extra">
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.DriveSystem" :compareModelList="compareModelList" :parent="'TransmissionSystem'" :type="'DriveSystem'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.TransmissionType" :compareModelList="compareModelList" :parent="'TransmissionSystem'" :type="'TransmissionType'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.Gear1" :compareModelList="compareModelList" :parent="'TransmissionSystem'" :type="'Gear1'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.Gear2" :compareModelList="compareModelList" :parent="'TransmissionSystem'" :type="'Gear2'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.Gear3" :compareModelList="compareModelList" :parent="'TransmissionSystem'" :type="'Gear3'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.Gear4" :compareModelList="compareModelList" :parent="'TransmissionSystem'" :type="'Gear4'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.Gear5" :compareModelList="compareModelList" :parent="'TransmissionSystem'" :type="'Gear5'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.Gear6" :compareModelList="compareModelList" :parent="'TransmissionSystem'" :type="'Gear6'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.ReverseGear" :compareModelList="compareModelList" :parent="'TransmissionSystem'" :type="'ReverseGear'" :groupType="'Technical'"/>
                        <!-- <CarComparisionArrayColumn :compareModelList="compareModelList" :field="carComparisonModel.Ratio" :parent="'TransmissionSystem'" :type="'Ratios'" :groupType="'Technical'"/> -->
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.FinalGearRatio" :compareModelList="compareModelList" :parent="'TransmissionSystem'" :type="'FinalGearRatio'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.TransferGearRatio" :compareModelList="compareModelList" :parent="'TransmissionSystem'" :type="'TransferGearRatio'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.DifferentailLockGear" :compareModelList="compareModelList" :parent="'TransmissionSystem'" :type="'HasDifferentialGearLock'" :groupType="'Technical'"/>
                      </div>
                    </div>
                  </b-collapse>
                </b-card>
                <b-card v-else-if="itemChild.name == 'SteeringSystem'  && itemChild.parentName == item" no-body class="car-comparision__card">
                  <b-card-header header-tag="header" class="car-comparision__card__header" role="tab"  @click="scrollToCollapse($event)">
                    <sc-text block class="car-comparision__card__header__button"  v-b-toggle.accordion-3 variant="info" tag="div" :field="getTitleField('SteeringSystemTitle')"/>
                  </b-card-header>
                  <b-collapse class="car-comparision__card__body" accordion="my-accordion"  role="tabpanel" id="accordion-3" :visible="index == 0">
                    <div class="car-comparision__card__body__content">
                      <div class="container container-extra">
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.SteeringType" :compareModelList="compareModelList" :parent="'SteeringSystem'" :type="'Type'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.MinimumTurningRadius" :compareModelList="compareModelList" :parent="'SteeringSystem'" :type="'MinimumTurningRadius'" :groupType="'Technical'"/>
                      </div>
                    </div>
                  </b-collapse>
                </b-card>

                <b-card v-else-if="itemChild.name == 'BrakeSystem'  && itemChild.parentName == item" no-body class="car-comparision__card">
                  <b-card-header header-tag="header" class="car-comparision__card__header" role="tab"  @click="scrollToCollapse($event)">
                    <sc-text block class="car-comparision__card__header__button"  v-b-toggle.accordion-4 variant="info" tag="div" :field="getTitleField('BrakeSystemTitle')"/>
                  </b-card-header>
                  <b-collapse class="car-comparision__card__body" accordion="my-accordion" role="tabpanel" id="accordion-4" :visible="index == 0">
                    <div class="car-comparision__card__body__content">
                      <div class="container container-extra">
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.BrakeFront" :compareModelList="compareModelList" :parent="'BrakeSystem'" :type="'Front'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.BrakeRear" :compareModelList="compareModelList" :parent="'BrakeSystem'" :type="'Rear'" :groupType="'Technical'"/>
                      </div>
                    </div>
                  </b-collapse>
                </b-card>
                <b-card v-else-if="itemChild.name == 'SuspensionSystem'  && itemChild.parentName == item" no-body class="car-comparision__card">
                  <b-card-header header-tag="header" class="car-comparision__card__header" role="tab"  @click="scrollToCollapse($event)">
                    <sc-text block class="car-comparision__card__header__button"  v-b-toggle.accordion-5 variant="info" tag="div" :field="getTitleField('SuspensionSystemTitle')"/>
                  </b-card-header>
                  <b-collapse class="car-comparision__card__body" accordion="my-accordion" role="tabpanel" id="accordion-5" :visible="index == 0">
                    <div class="car-comparision__card__body__content">
                      <div class="container container-extra">
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.SuspensionFront" :compareModelList="compareModelList" :parent="'SuspensionSystem'" :type="'Front'" :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.SuspensionRear" :compareModelList="compareModelList"  :parent="'SuspensionSystem'" :type="'Rear'" :groupType="'Technical'"/>
                      </div>
                    </div>
                  </b-collapse>
                </b-card>
                <b-card v-else-if="itemChild.name == 'WheelsTires'  && itemChild.parentName == item" no-body class="car-comparision__card">
                  <b-card-header header-tag="header" class="car-comparision__card__header" role="tab"  @click="scrollToCollapse($event)">
                    <sc-text block class="car-comparision__card__header__button"  v-b-toggle.accordion-6 variant="info" tag="div" :field="getTitleField('WheelsAndTiresTitle')" />
                  </b-card-header>
                  <b-collapse class="car-comparision__card__body" accordion="my-accordion"  role="tabpanel" id="accordion-6" :visible="index == 0">
                    <div class="car-comparision__card__body__content">
                      <div class="container container-extra">
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel"  :field="carComparisonModel.Wheel" :compareModelList="compareModelList" :parent="'WheelsTires'" :type="'Wheel'"  :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel"  :field="carComparisonModel.TireSize" :compareModelList="compareModelList" :parent="'WheelsTires'" :type="'TireSize'"  :groupType="'Technical'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel"  :field="carComparisonModel.SpareTires" :compareModelList="compareModelList" :parent="'WheelsTires'" :type="'SpareTires'"  :groupType="'Technical'"/>
                      </div>
                    </div>
                  </b-collapse>
                </b-card>
                <b-card v-else-if="itemChild.name == 'Exterior'  && itemChild.parentName == item" no-body class="car-comparision__card">
                  <b-card-header header-tag="header" class="car-comparision__card__header" role="tab"  @click="scrollToCollapse($event)">
                    <sc-text block class="car-comparision__card__header__button"  v-b-toggle.accordion-8 variant="info" tag="div" :field="getTitleField('ExteriorEquipmentTitle')"/>
                  </b-card-header>
                  <b-collapse class="car-comparision__card__body" accordion="my-accordion"  role="tabpanel" id="accordion-8" :visible="index == 0">
                    <div class="car-comparision__card__body__content">
                      <div class="container container-extra">
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel"  :field="carComparisonModel.Headlights" :compareModelList="compareModelList" :parent="'Exterior'" :type="'Headlights'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel"  :field="carComparisonModel.HeadlightsLevelingSystem" :compareModelList="compareModelList" :parent="'Exterior'" :type="'HeadlightsLevelingSystem'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel"  :field="carComparisonModel.AutomaticHeadlights" :compareModelList="compareModelList" :parent="'Exterior'" :type="'HasTurnOffAutomaticHeadlights'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel"  :field="carComparisonModel.FrontFogLights" :compareModelList="compareModelList" :parent="'Exterior'" :type="'FrontFogLights'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel"  :field="carComparisonModel.Taillights" :compareModelList="compareModelList" :parent="'Exterior'" :type="'Taillights'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel"  :field="carComparisonModel.FrontGrille" :compareModelList="compareModelList" :parent="'Exterior'" :type="'FrontGrille'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel"  :field="carComparisonModel.RearBumper" :compareModelList="compareModelList" :parent="'Exterior'" :type="'RearBumper'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel"  :field="carComparisonModel.SideMirror" :compareModelList="compareModelList" :parent="'Exterior'" :type="'SideMirror'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel"  :field="carComparisonModel.DoorHandle" :compareModelList="compareModelList" :parent="'Exterior'" :type="'DoorHandle'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel"  :field="carComparisonModel.SideSteps" :compareModelList="compareModelList" :parent="'Exterior'" :type="'SideSteps'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel"  :field="carComparisonModel.Rear" :compareModelList="compareModelList" :parent="'Exterior'" :type="'Rear'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel"  :field="carComparisonModel.Windshield" :compareModelList="compareModelList" :parent="'Exterior'" :type="'Windshield'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel"  :field="carComparisonModel.FrontWiper" :compareModelList="compareModelList" :parent="'Exterior'" :type="'FrontWiper'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel"  :field="carComparisonModel.AutomaticWiperSystem" :compareModelList="compareModelList"  :parent="'Exterior'" :type="'HasAutomaticWiperSystem'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel"  :field="carComparisonModel.Antenna" :compareModelList="compareModelList" :parent="'Exterior'" :type="'Antenna'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel"  :field="carComparisonModel.RoofRail" :compareModelList="compareModelList" :parent="'Exterior'" :type="'HasRoofRail'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel"  :field="carComparisonModel.TwoToneRearSpoiler" :compareModelList="compareModelList" :parent="'Exterior'" :type="'HasTwoToneRearSpoiler'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel"  :field="carComparisonModel.WheelArchDecoration" :compareModelList="compareModelList" :parent="'Exterior'" :type="'HasWheelArchDecoration'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel"  :field="carComparisonModel.PickupRimsAndPickupTruckFloor" :compareModelList="compareModelList" :parent="'Exterior'" :type="'HasPickupRimsAndPickupTruckFloor'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel"  :field="carComparisonModel.FrontBumperDecoration" :compareModelList="compareModelList" :parent="'Exterior'" :type="'HasFrontBumperDecoration'" :groupType="'Equipment'"/>
                      </div>
                    </div>
                  </b-collapse>
                </b-card>

                <b-card v-else-if="itemChild.name == 'Interior'  && itemChild.parentName == item" no-body class="car-comparision__card">
                  <b-card-header header-tag="header" class="car-comparision__card__header" role="tab"  @click="scrollToCollapse($event)">
                    <sc-text block class="car-comparision__card__header__button"  v-b-toggle.accordion-9 variant="info" tag="div" :field="getTitleField('InteriorEquipmentTitle')"/>
                  </b-card-header>
                  <b-collapse class="car-comparision__card__body" accordion="my-accordion"  role="tabpanel" id="accordion-9" :visible="index == 0">
                    <div class="car-comparision__card__body__content">
                      <div class="container container-extra">
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.Gauge" :compareModelList="compareModelList" :parent="'Interior'" :type="'Gauge'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.MultiInfoDisplay" :compareModelList="compareModelList" :parent="'Interior'" :type="'MultiInfoDisplay'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.GearShiftIndicatingSystem" :compareModelList="compareModelList" :parent="'Interior'" :type="'HasGearShiftIndicatingSystem'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.GarlandDecoration" :compareModelList="compareModelList" :parent="'Interior'" :type="'GarlandDecoration'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.SteeringWheel" :compareModelList="compareModelList" :parent="'Interior'" :type="'SteeringWheel'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.AudioControlOnSteeringWheel" :compareModelList="compareModelList" :parent="'Interior'" :type="'HasAudioControlOnSteeringWheel'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.CruiseControl" :compareModelList="compareModelList" :parent="'Interior'" :type="'HasCruiseControl'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.FrontConsoleDecoration" :compareModelList="compareModelList" :parent="'Interior'" :type="'FrontConsoleDecoration'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.MultipurposeHolder" :compareModelList="compareModelList" :parent="'Interior'" :type="'MultipurposeHolder'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.CenterConsole" :compareModelList="compareModelList" :parent="'Interior'" :type="'CenterConsole'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.DoorPanelDecoration" :compareModelList="compareModelList" :parent="'Interior'" :type="'DoorPanelDecoration'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.InnerDoorOpeningHandle" :compareModelList="compareModelList" :parent="'Interior'" :type="'InnerDoorOpeningHandle'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.DoorAssistGrip" :compareModelList="compareModelList" :parent="'Interior'" :type="'DoorAssistGrip'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.PowerWindows" :compareModelList="compareModelList" :parent="'Interior'" :type="'PowerWindows'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.CentralLocking" :compareModelList="compareModelList" :parent="'Interior'" :type="'CentralLocking'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.IntegratedRemoteKeyless" :compareModelList="compareModelList" :parent="'Interior'" :type="'IntegratedRemoteKeyless'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.IsuzuGeniusEntryKeyAndPushStart" :compareModelList="compareModelList" :parent="'Interior'" :type="'IsuzuGeniusEntryKeyAndPushStart'" :groupType="'Equipment'"/>

                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.AudioSystem" :compareModelList="compareModelList" :parent="'Interior'" :type="'AudioModel.AudioSystem'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.TelephoneConnection" :compareModelList="compareModelList" :parent="'Interior'" :type="'AudioModel.TelephoneConnection'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.USBorAUXDevice" :compareModelList="compareModelList" :parent="'Interior'" :type="'AudioModel.HasUSBorAUXDevice'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.NumberOfSpeakers" :compareModelList="compareModelList" :parent="'Interior'" :type="'AudioModel.NumberOfSpeakers'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.NavigationSystem" :compareModelList="compareModelList" :parent="'Interior'" :type="'AudioModel.HasNavigationSystem'" :groupType="'Equipment'"/>

                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.PowerSocket12Volt" :compareModelList="compareModelList" :parent="'Interior'" :type="'HasPowerSocket12Volt'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.PowerSocket220Volt" :compareModelList="compareModelList" :parent="'Interior'" :type="'HasPowerSocket220Volt'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.Additional21AUSBPowerOutlet" :compareModelList="compareModelList" :parent="'Interior'" :type="'HasAdditionalUSBPowerOutlet'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.AirConditioningSystem" :compareModelList="compareModelList" :parent="'Interior'" :type="'AirConditioningSystem'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.AirVentsRearPassengers" :compareModelList="compareModelList" :parent="'Interior'" :type="'HasAirVentsRearPassengers'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.AirFilter" :compareModelList="compareModelList" :parent="'Interior'" :type="'HasAirFilter'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.GlassesHolderWithLight" :compareModelList="compareModelList" :parent="'Interior'" :type="'HasGlassesHolderWithLight'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.Sunshade" :compareModelList="compareModelList" :parent="'Interior'" :type="'Sunshade'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.InteriorLamp" :compareModelList="compareModelList" :parent="'Interior'" :type="'HasInteriorLamp'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.CeilingMonitorRearPassengers" :compareModelList="compareModelList" :parent="'Interior'" :type="'HasCeilingMonitorRearPassengers'" :groupType="'Equipment'"/>

                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.Material" :compareModelList="compareModelList" :parent="'Interior'" :type="'SeatModel.Material'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.TheFrontCanAdjusted" :compareModelList="compareModelList" :parent="'Interior'" :type="'SeatModel.TheFrontCanAdjusted'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.Seat2" :compareModelList="compareModelList" :parent="'Interior'" :type="'SeatModel.Seat2'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.Seat3" :compareModelList="compareModelList" :parent="'Interior'" :type="'SeatModel.Seat3'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.DocumentStorageCompartment" :compareModelList="compareModelList" :parent="'Interior'" :type="'SeatModel.HasDocumentStorageCompartment'" :groupType="'Equipment'"/>

                      </div>
                    </div>
                  </b-collapse>
                </b-card>
                <b-card v-else-if="itemChild.name == 'Safety'  && itemChild.parentName == item" no-body class="car-comparision__card">
                  <b-card-header header-tag="header" class="car-comparision__card__header" role="tab"  @click="scrollToCollapse($event)">
                    <sc-text block class="car-comparision__card__header__button"  v-b-toggle.accordion-10 variant="info" tag="div" :field="getTitleField('SafetyEquipmentTitle')"/>
                  </b-card-header>
                  <b-collapse class="car-comparision__card__body" accordion="my-accordion" role="tabpanel" id="accordion-10" :visible="index == 0">
                    <div class="car-comparision__card__body__content">
                      <div class="container container-extra">
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.LEDDaytimeRunningLight" :compareModelList="compareModelList"  :parent="'Safety'" :type="'HasLEDDaytimeRunningLight'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.LEDTurningSignal" :compareModelList="compareModelList" :parent="'Safety'" :type="'HasLEDTurningSignal'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.TurningSignalLights" :compareModelList="compareModelList" :parent="'Safety'" :type="'HasTurningSignalLights'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.ThirdBrakeLight" :compareModelList="compareModelList" :parent="'Safety'" :type="'Has3rdBrakeLight'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.RearWindowDefogger" :compareModelList="compareModelList" :parent="'Safety'" :type="'HasRearWindowDefogger'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.RearViewCamera" :compareModelList="compareModelList" :parent="'Safety'" :type="'HasRearViewCamera'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.FrontSeatBelt" :compareModelList="compareModelList"  :parent="'Safety'" :type="'FrontSeatBelt'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.SeatBelt2" :compareModelList="compareModelList" :parent="'Safety'" :type="'SeatBelt2'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.SeatBelt3" :compareModelList="compareModelList" :parent="'Safety'" :type="'SeatBelt3'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.FrontSideAirbags" :compareModelList="compareModelList"  :parent="'Safety'" :type="'HasFrontSideAirbags'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.SideAirbags" :compareModelList="compareModelList" :parent="'Safety'" :type="'HasSideAirbags'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.SideCurtainAirbags" :compareModelList="compareModelList"  :parent="'Safety'" :type="'HasSideCurtainAirbags'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.ISOFIXMountingPoints" :compareModelList="compareModelList" :parent="'Safety'" :type="'HasISOFIXMountingPoints'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.RearViewMirrorWithAntiGlare" :compareModelList="compareModelList" :parent="'Safety'" :type="'RearViewMirrorWithAntiGlare'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.ABSwithEBDandBA" :compareModelList="compareModelList" :parent="'Safety'" :type="'HasABSwithEBDandBA'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.BrakeOverrideSystem" :compareModelList="compareModelList" :parent="'Safety'" :type="'HasBrakeOverrideSystem'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.ESCElectronicStabilityControlSystem" :compareModelList="compareModelList" :parent="'Safety'" :type="'HasESCElectronicStabilityControlSystem'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.TCSTractionControlSystem" :compareModelList="compareModelList" :parent="'Safety'" :type="'HasTCSTractionControlSystem'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.HSAHillStartAssistSystem" :compareModelList="compareModelList" :parent="'Safety'" :type="'HasHSAHillStartAssistSystem'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.HDCHillDescentControlSystem" :compareModelList="compareModelList" :parent="'Safety'" :type="'HasHDCHillDescentControlSystem'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.BSMBlindSpotMonitoringSystem" :compareModelList="compareModelList" :parent="'Safety'" :type="'HasBSMBlindSpotMonitoringSystem'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.RCTARearCrossTrafficAlertSystem" :compareModelList="compareModelList" :parent="'Safety'" :type="'HasRCTARearCrossTrafficAlertSystem'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.PointsParkingSensors" :compareModelList="compareModelList" :parent="'Safety'" :type="'Has8PointsParkingSensors'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.ESSEmergencySignalSystem" :compareModelList="compareModelList" :parent="'Safety'" :type="'HasESSEmergencySignalSystem'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.WalkAwayAutoDoorLock" :compareModelList="compareModelList" :parent="'Safety'" :type="'HasWalkAwayAutoDoorLock'" :groupType="'Equipment'"/>
                        <CarComparisionColumn :available="carComparisonModel.AvailableLabel" :unavaiable="carComparisonModel.UnavailableLabel" :field="carComparisonModel.AntiTheftAlarm" :compareModelList="compareModelList" :parent="'Safety'" :type="'HasAntiTheftAlarm'" :groupType="'Equipment'"/>
                      </div>
                    </div>
                  </b-collapse>
                </b-card>

              </div>
            </b-collapse>
          </div>
        </div>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import CarComparisionColumn from './CarComparisionColumn';
import CarComparisionArrayColumn from './CarComparisionArrayColumn';
import CarComparisionObjectColumn from './CarComparisionObjectColumn';
import { trackingApi } from '@sitecore-jss/sitecore-jss-tracking';
import { dataFetcher } from '../../dataFetcher';
import config from '../../temp/config';

import * as $ from 'jquery';
export default {
  name: 'CarComparisionCollapse',
  components: {
    ScText: Text,
    CarComparisionColumn: CarComparisionColumn,
    CarComparisionArrayColumn: CarComparisionArrayColumn,
    CarComparisionObjectColumn : CarComparisionObjectColumn
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    carComparisonModel: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      compareModelList : [],
      listGroupName : [],
      listPropertiesName : [],
      blankText: { value: ' ' },
      showInfo: false,
      listGroupNameRender: [],
      listPropertiesNameRender: [],
      txtGoal: '',
      txtPageId: '',
    };
  },
  mounted() {
    this.txtPageId = this.$jss.routeData().itemId;
    this.txtGoal = this.carComparisonModel.TriggerGoals?.id;
    this.$root.$on('carGradeProperties', (data) => {
      if(this.checkGradeAlreadyExists(data.index)){
        this.compareModelList.forEach(item => {
          if(item.index == data.index){
            item.properties = data.properties
          }
        })
      }else{
        this.compareModelList.push({
          index : data.index,
          properties : data.properties,
        })
      }
      this.showInfo = false;
    });
    this.$root.$on('comparision:listProperties',(data) => {
      let firstDataPropeties = data[0];
      if(firstDataPropeties?.properties?.length){
        firstDataPropeties.properties.forEach(item => {
          // INFO : get list properties name
          if(item?.Data?.length){
            this.listGroupName.push(item.Name);
            item.Data.forEach(property => {
              this.listPropertiesName.push({
                parentName : item.Name,
                name : property.Name
              })
            })
          }
        })
      }
      this.compareModelList = data;
    })
  },
  computed: {
    trackingApiOptions() {
      return {
        host: config.sitecoreApiHost,
        querystringParams: {
          sc_apikey: config.sitecoreApiKey,
        },
        fetcher: dataFetcher,
      };
    },
  },
  methods: {
    checkGradeAlreadyExists(index) {
      return this.compareModelList.find((item) => item.index == index);
    },
    getStickyHeight(){
      return $('.car-comparision-fix').height() + 50;
    },
    getTitleField(fieldName){
      return this.carComparisonModel[`${fieldName}`]?.value?.length ? this.carComparisonModel[`${fieldName}`] : blankText;
    },
    showInformation() {
      trackingApi
        .trackEvent([{ goalId: this.txtGoal, pageId: this.txtPageId }], this.trackingApiOptions)
        .catch((error) => console.error(error));
      this.showInfo = true;
      this.listGroupNameRender = [];
      this.listPropertiesNameRender = [];
      this.scollToEngineTarget();
    },
    scollToEngineTarget(){
      setTimeout(() => {
        this.listGroupNameRender = [...this.listGroupName];
        this.listPropertiesNameRender = [...this.listPropertiesName];
        setTimeout(() => {
          let targetEngine = $(this.$refs.engineElement);
          const stickyHeight = this.getStickyHeight();
          let offsetTop = targetEngine.offset().top - stickyHeight - 60;
          this.onScrollHandler(offsetTop);
        }, 500);
      },200);
    },
    scrollToCollapse(event){
      this.clickCollapseHandler(event);
    },
    scrollToParentCollapse(event){
      this.clickCollapseHandler(event);
    },
    clickCollapseHandler(event){
      if(!$(event.target).hasClass('collapsed')){
        setTimeout(() => {
          const stickyHeight = this.getStickyHeight();
          const topPixel = $(event.target).offset().top - stickyHeight;
          this.onScrollHandler(topPixel);
        }, 500);
      }
    },
    onScrollHandler(top){
      window.scroll({ top, left: 0, behavior: 'smooth' });
    }
  },
};
</script>
<style lang="scss">
@import '../../assets/reuse-mixin';
.list-group-name {
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  margin-bottom: 20px;

  &:last-of-type {
    border-top: 1px solid rgba(0, 0, 0, 0.125);
  }

  &__title {
    font-weight: bold;
    color: #ee0009; // Color follow customer's current website
  }
}

.compare-model-group {
  text-align: center;
  padding: 5px 10px;

  @include media-breakpoint-down(sm) {
    &:nth-of-type(n + 4) {
      display: none;
    }
  }

  @include media-breakpoint-up(md) {
    &:last-child {
      display: none;
    }
  }

  @include media-breakpoint-up(lg) {
    padding: 0 15px;

    &:last-child {
      display: block;
    }
  }

  .car-comparision__card__body__content__detail {
    padding: 5px 0;

    @include media-breakpoint-up(lg) {
      padding: 10px 0;
    }
  }
}

.compare-model-button {
  background: #f5f5f5;
  padding-bottom: 20px;

  @include ripple($primary-bgr);

  .button {
    cursor: pointer;
  }
}

.car-comparision {
  background: #f5f5f5;
  padding-bottom: 12px;

  &--information {
    display: none;
  }

  &.show-info {
    display: block;
  }

  &__card {
    &__header {
      &__button {
        position: relative;
        text-decoration: none;
        // color: $black;
        outline: none;
        width: 100%;
        padding: 10px 10px 10px 25px;
        cursor: pointer;
        min-height: 40px;
        font-weight: bold;
        font-size: $font-size-comparison-collapse-small;

        @include media-breakpoint-up(lg) {
          padding: 12px 12px 12px 50px;
          font-size: $font-size-comparison-collapse;
          min-height: 60px;
        }

        &:focus {
          outline: none;
        }

        &:after {
          content: '';
          width: 15px;
          height: 15px;
          background: url('../../assets/arrow-down-collapse.png');
          background-position: center;
          background-repeat: no-repeat;
          transition: all .3s ease-in-out;
          transform: rotate(180deg);
          position: absolute;
          right: 13px;
          top: 13px;
          background-size: 12px;

          @include media-breakpoint-up(lg) {
            right: 30px;
            top: 25px;
            background-size: 14px;
          }
        }

        &.car-comparision-collapse {
          color: #ee0009; // Color followed customer's current site
        }

        &.collapsed {
          &:after {
            transform: rotate(0deg);
            position: absolute;
            right: 13px;
            top: 13px;

            @include media-breakpoint-up(lg) {
              right: 30px;
              top: 25px;
            }
          }
        }

        &.list-group-name__title {
          padding-left: 10px;

          @include media-breakpoint-up(lg) {
            padding: 12px;
          }

          &::after {
            background: url('../../assets/arrow-compare-car.png');
            background-position: center;
            background-repeat: no-repeat;
            background-size: 12px;

            @include media-breakpoint-up(lg) {
              background-size: 14px;
              top: 22px;
              right: 30px;
            }
          }
        }
      }
    }

    &__body {
      &__content {
        width: 100%;
        background: #f5f5f5;
        padding: 10px 0 0 25px;
        font-size: $font-size-comparison-small;

        @include media-breakpoint-up(md) {
          padding: 30px 0 15px;
          border-top: 1px solid rgba(0, 0, 0, 0.125);
        }

        @include media-breakpoint-up(lg) {
          padding: 55px 0 40px;
          font-size: $font-size-base;
        }

         @include hover-desktop() {
           padding: 0;
         }

        .col-sm-3 {
          @include media-breakpoint-up(lg) {
            padding: 25px 40px 0 0;
          }

          // TODO: we have to remove this when using v-for

          &:last-child {
            display: none;

            @include media-breakpoint-up(md) {
              display: block;
            }
          }
        }

        .row {
          border: 1px solid rgba(0, 0, 0, 0.125);
          margin-bottom: 15px;

          &:last-of-type {
            margin-bottom: 0;
            border-bottom: none;
          }

          @include media-breakpoint-up(md) {
            border: none;

            [class*='col-'] {
              padding: 0 10px;
            }
          }

          @include media-breakpoint-up(lg) {
            [class*='col-'] {
              padding: 0 15px;
            }
          }

          @include hover-desktop() {
            margin-bottom: 0;
            padding: 7.5px 15px;
            background: transparent;
            transition: all .2s cubic-bezier(.215,.61,.355,1);

            &:hover {
              background: $white;

              .car-comparision__card__body__content__title {
                background: $white;
              }
            }
          }
        }

        .border-none {
          border: none;
        }

        &__title {
          background: $white;
          padding: 10px 7px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.125);
          font-weight: bold;
          font-size: $font-size-comparison-title-small;
          transition: all .2s cubic-bezier(.215,.61,.355,1);

          @include media-breakpoint-up(md) {
            border: none;
            background: #f5f5f5;
            padding: 10px 0;
          }

          @include media-breakpoint-up(lg) {
            font-size: $font-size-comparison-title;
          }

          &.fontsize-mobile-big {
            font-size: $font-size-comparison-title-small;
            margin: 0 -15px;

            @include media-breakpoint-up(md) {
              padding-left: 15px;
              margin: 0;
            }

            @include media-breakpoint-up(lg) {
              padding-left: 35px;
              margin: 0;
              font-size: $font-size-comparison-title;
            }
          }
        }

        &__image {
          width: 20px;
          height: auto;

          @include media-breakpoint-up(md) {
            padding: 15px 0;
          }
        }

        &__detail {
          padding: 10px 7px;
          text-transform: initial;
          text-align: center;

          @include media-breakpoint-up(md) {
            padding: 10px 0;
          }

          &.fontsize-mobile-big {
            font-size: $font-size-comparison-small;

            @include media-breakpoint-up(lg) {
              font-size: $font-size-base;
            }
          }
        }

        &__sup-title {
          padding: 10px 7px 0 7px;

          @include media-breakpoint-up(md) {
            padding: 10px 0;
          }
        }

        &__desc {
          padding: 0 7px 10px 7px;

          li {
            padding-left: 10px;
            position: relative;

            &::before {
              content: '-';
              position: absolute;
              left: 0;
            }

            @include media-breakpoint-up(md) {
              padding-left: 15px;
            }
          }
        }
      }
    }
  }

  .card-header {
    padding: 0;
    background: #f5f5f5;
    border-bottom: none;
  }

  .card {
    border-left: none;
    border-right: none;
    background-color: $white;
    border-radius: 0;
    border: none;

    &:first-child {
      border-top: 1px solid rgba(0, 0, 0, 0.125);
    }
  }

  .car-comparision-collapse {
    text-align: right;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    padding: 10px 40px 10px 40px;
    position: relative;
    cursor: pointer;

    @include media-breakpoint-up(lg) {
      padding: 10px 60px 10px 60px;
    }

    &:after {
      content: '';
      width: 15px;
      height: 15px;
      background: url('../../assets/arrow-compare-car.png');
      background-position: center;
      background-repeat: no-repeat;
      position: absolute;
      top: 18px;
      right: 13px;
      background-size: 12px;

      @include media-breakpoint-up(lg) {
        background-size: 14px;
        top: 22px;
        right: 30px;
      }
    }
  }

  p {
    margin: 0;
  }
}
</style>
