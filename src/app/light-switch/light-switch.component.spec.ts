import { LightswitchComponent } from './light-switch.component';

describe('LightswitchComp', () => {
  let comp: LightswitchComponent;

  beforeEach(() => {
    // Arrange
    comp = new LightswitchComponent();
  });

  it('#isOn should be false by default', () => {
    // Assert
    expect(comp.isOn).toBe(false);
  });

  it('#clicked() should toggle #isOn', () => {
    // Act
    comp.clicked();

    // Assert
    expect(comp.isOn).toBe(true);

    // Act
    comp.clicked();

    // Assert
    expect(comp.isOn).toBe(false);
  });

  it('#message should be "is off" by default', () => {
    // Assert
    expect(comp.message).toMatch(/is off/i);
  });

  it('#clicked() should set #message to "is on"', () => {
    // Act
    comp.clicked();

    // Assert
    expect(comp.message).toMatch(/is on/i);
  });
});
