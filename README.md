<img src="https://user-images.githubusercontent.com/1212163/110364874-5512e380-8012-11eb-898d-f89a49ffa616.png" />

# SMART Provider Dashboard for CardinalKit

A SMART-on-FHIR dashboard application built in React that can be launched from within an Electronic Health Record system, designed to be used with [CardinalKit](https://cardinalkit.org/) patient-facing mobile apps. 

Check out the <a href="https://www.youtube.com/watch?v=CGj_X79yk-o">demo video</a>.

The screenshot below shows a dashboard used to visualize sample hypertension data, launched within an instance of <a href="https://open-emr.org">OpenEMR</a>.

<img src="https://user-images.githubusercontent.com/1212163/121445480-88417780-c95f-11eb-9858-a0f1e8929a25.png" width="800" />


## Testing the app with the SMART Launcher

1. From the `dashboard` folder, install dependencies by running `yarn install`
2. Start the application locally by running `yarn start`.
3. Load the [SMART Launcher](https://launch.smarthealthit.org) in your browser, select a sample patient and provider, then add `http://localhost:3000/launch` as the App Launch URL and launch the app.

<img src="https://user-images.githubusercontent.com/1212163/110365131-a622d780-8012-11eb-9270-4291c243108b.png" />
