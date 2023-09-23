![CardinalKit Logo](https://raw.githubusercontent.com/CardinalKit/.github/main/assets/ck-header-light.png#gh-light-mode-only)
![CardinalKit Logo](https://raw.githubusercontent.com/CardinalKit/.github/main/assets/ck-header-dark.png#gh-dark-mode-only)

# SMART-on-FHIR Provider Dashboard for CardinalKit

> [!IMPORTANT]  
> The CardinalKit SMART-on-FHIR Dashboard has moved to https://github.com/StanfordSpezi/SpeziSMARTonFHIR. The version in this repository is archived.

A SMART-on-FHIR dashboard application built in React that can be launched from within an Electronic Health Record system, designed to be used with [CardinalKit](https://cardinalkit.org/) patient-facing mobile apps. 

Check out the <a href="https://www.youtube.com/watch?v=CGj_X79yk-o">demo video</a>.

The screenshot below shows a dashboard used to visualize sample hypertension data, launched within an instance of <a href="https://open-emr.org">OpenEMR</a>.

<img src="https://user-images.githubusercontent.com/1212163/121445480-88417780-c95f-11eb-9858-a0f1e8929a25.png" width="800" />


## Installation

1. From the `dashboard` folder, install dependencies by running `yarn install`.
2. Set the environment variables in `.env.sample` and rename it to `.env`.
    - `REACT_APP_SMART_CLIENTID` and `REACT_APP_SMART_CLIENTSECRET` are the client credentials registered with your EHR system. (Note: The SMART Launcher does not validate these, so any two strings will work.)
    - `REACT_APP_SMART_SCOPE` is the set of [FHIR scopes](http://www.hl7.org/fhir/smart-app-launch/scopes-and-launch-context/) your app will request access to. 

## Testing with the SMART Launcher

1. Start the application locally by running `yarn start`.
2. Load the [SMART Launcher](https://launch.smarthealthit.org) in your browser.
3. Select **Provider EHR Launch** and set **FHIR Version** to **R4**.
4. Select a sample patient and provider.
5. Enter `http://localhost:3000/launch` in **App Launch URL** and launch the app!

## Customization

In the `dashboard/src/components/hypertension` folder you'll find an example hypertension dashboard that can be customized to visualize any data of your choice!

## License

CardinalKit's SMART-on-FHIR Dashboard is available under the MIT license.

![Stanford Byers Center for Biodesign Logo](https://raw.githubusercontent.com/CardinalKit/.github/main/assets/ck-footer-light.png#gh-light-mode-only)
![Stanford Byers Center for Biodesign Logo](https://raw.githubusercontent.com/CardinalKit/.github/main/assets/ck-footer-dark.png#gh-dark-mode-only)
