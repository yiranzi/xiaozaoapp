
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';
import Footer from '../../src/page/writtentestclocksecond/footer';
export default class extends React.Component {
	renderGlobalCss() {
		return (
			<style global jsx>{`
					.written-test-clock {
						padding: 0!important;
					}
			`}</style>
		);
	}
	render() {
		return (
			<WrittenTestClock>
				<div className='more-test-img'>
        <Footer />
        <style jsx>{`
					.more-test-img {
						background-image: url(/static/writtentestclock/more-test.jpeg);
						background-repeat: no-repeat;
						background-size: 100% 100%;
						height: 100vh;
						width: 100vw;
						margin-bottom: 30px;
					}
				`}</style>
        {this.renderGlobalCss()}
      </div>
			</WrittenTestClock>
		);
	}
}
