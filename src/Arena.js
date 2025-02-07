import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { AmbientLight, DirectionalLight } from 'three'


const fogI = {
	color: 0x326e72,
	near: 15,
	far: 150,
}

const floI = {
	size: new THREE.Vector2(300, 300),
	pos: new THREE.Vector3(0, -1.5, 0),
	color: 0x7fdce2,
}

const walI = {
	size: new THREE.Vector3(1, 2, 46),
	pos: new THREE.Vector3(17, 0, 1),
	color: 0xDDDDDD,
}

const linI = {
	size: new THREE.Vector2(0.8, 0.5),
	pos: new THREE.Vector3(17, -1.4, 0),
	color: 0x2a484a,
}

const pilI = {
	size1: new THREE.CatmullRomCurve3([
		new THREE.Vector3(0, 0, 0),
    	new THREE.Vector3(0, 15, 0),
    	new THREE.Vector3(-11, 18, 0),
	], false),
	pos1: new THREE.Vector3(17, 0, 0),
	size2: new THREE.CatmullRomCurve3([
		new THREE.Vector3(0, 0, 0),
    	new THREE.Vector3(5, 0, 0),
    	new THREE.Vector3(5, 5, 0),
		new THREE.Vector3(-5, 5, 0),
		new THREE.Vector3(-5, 0, 0),
	], true),
	pos2: new THREE.Vector3(0, 15, 0),
	color: 0xDDDDDD,
}

const scrI = {
	size: new THREE.Vector2(10.5, 6, 0.1),
	pos: new THREE.Vector3(0, 17.6, 0),
	color: 0x000000,
}

const delI = {
	size: new THREE.Vector3(50, 2, 1),
	pos: new THREE.Vector3(0, 0, -30),
}

const scoI = {
	fontURL: 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
	size: 3,
	height: 0.5,
	pos: new THREE.Vector3(0, 17.6, 0.5),
	color: 0xDDDDDD,
}

export default class Arena {
	constructor(scene) {
		this.scene = scene
		this.setLight()
		this.setFog()
		this.setFloor()
		this.setWall()
		this.setLine()
		this.setPilar()
		this.setScreen()
		this.setDelimiter()
		this.setScore("0", "0")
	}

	setLight() {
		const ambientLight = new AmbientLight(0xffffff, 0.6)
		const dirLight = new DirectionalLight(0xffffff, 0.7)

		dirLight.position.set(20, 20, 20)
		dirLight.castShadow = true
		dirLight.shadow.mapSize.set(1024, 1024)
		dirLight.shadow.camera.top = 30
		dirLight.shadow.camera.bottom = -30
		dirLight.shadow.camera.left = -30
		dirLight.shadow.camera.right = 30
		dirLight.shadow.radius = 10
		dirLight.shadow.blurSamples = 20
		this.scene.add(ambientLight, dirLight)
	}

	setFog() {
		this.scene.background = new THREE.Color(fogI.color)
		this.scene.fog = new THREE.Fog(fogI.color, fogI.near, fogI.far)
	}

	setFloor() {
		let geometry, material, floor
		geometry = new THREE.PlaneGeometry(floI.size.x, floI.size.y)
		material = new THREE.MeshStandardMaterial({color: floI.color})
		floor = new THREE.Mesh(geometry, material)
		floor.position.copy(floI.pos)
		floor.rotateX(-Math.PI * 0.5)
		floor.receiveShadow = true
		this.scene.add(floor)
		this.floor = floor
	}

	setWall() {
		let geometry, material, wall
		this.walls = []
		for (let i = 0; i < 2; i++) {
			geometry = new RoundedBoxGeometry(walI.size.x, walI.size.y, walI.size.z, 5, 0.5)
			material = new THREE.MeshStandardMaterial({color: walI.color})
			wall = new THREE.Mesh(geometry, material)
			wall.castShadow = true
			wall.receiveShadow = true
			if (!i) wall.position.copy(walI.pos)
			else wall.position.copy(new THREE.Vector3(-walI.pos.x, walI.pos.y, walI.pos.z))
			this.scene.add(wall)
			this.walls.push(wall)
		}
	}
	
	setLine() {
		let geometry, material, line, n = 20
		for (let i = 1; i < n; i++) {
			geometry = new THREE.PlaneGeometry(linI.size.x, linI.size.y)
			material = new THREE.MeshBasicMaterial({color: linI.color})
			line = new THREE.Mesh(geometry, material)
			line.position.copy(new THREE.Vector3(linI.pos.x - (i * ((linI.pos.x * 2) / n)), linI.pos.y, linI.pos.z))
			line.rotateX(-Math.PI * 0.5)
			this.scene.add(line)
		}
	}

	setPilar() {
		let geometry, material, pilar
		for (let i = 0; i < 2; i++) {
			geometry = new THREE.TubeGeometry(pilI.size1, 64, 0.5, 16, false)
			material = new THREE.MeshStandardMaterial({color: pilI.color})
			pilar = new THREE.Mesh(geometry, material)
			pilar.castShadow = true
			pilar.receiveShadow = true
			if (!i) pilar.position.copy(pilI.pos1)
			else
			{
				pilar.position.copy(new THREE.Vector3(-pilI.pos1.x, pilI.pos1.y, pilI.pos1.z))
				pilar.rotateY(Math.PI)
			}
			this.scene.add(pilar)
		}
		geometry = new THREE.TubeGeometry(pilI.size2, 64, 0.5, 16, true)
		material = new THREE.MeshStandardMaterial({color: pilI.color})
		pilar = new THREE.Mesh(geometry, material)
		pilar.castShadow = true
		pilar.receiveShadow = true
		pilar.position.copy(pilI.pos2)
		this.scene.add(pilar)
	}

	setScreen() {
		let geometry, material, screen
		geometry = new RoundedBoxGeometry(scrI.size.x, scrI.size.y, scrI.size.z, 5, 0.5)
		material = new THREE.MeshStandardMaterial({color: scrI.color})
		screen = new THREE.Mesh(geometry, material)
		screen.castShadow = true
		screen.receiveShadow = true
		screen.position.copy(scrI.pos)
		this.scene.add(screen)
	}

	setDelimiter() {
		let geometry, material, delimiter
		this.delimiters = []
		for (let i = 0; i < 2; i++) {
			geometry = new RoundedBoxGeometry(delI.size.x, delI.size.y, delI.size.z, 5, 0.5)
			//material = new THREE.MeshStandardMaterial({color: 0xFFFFFF})
			material = new THREE.MeshStandardMaterial({
				transparent: true,
				opacity: 0
			})
			delimiter = new THREE.Mesh(geometry, material)
			if (!i) delimiter.position.copy(delI.pos)
			else delimiter.position.copy(new THREE.Vector3(delI.pos.x, delI.pos.y, -delI.pos.z))
			this.scene.add(delimiter)
			this.delimiters.push(delimiter)
		}
	}

	setScore(player1, player2) {
		let geometry, material, score
		this.scores = []
		const loader = new FontLoader()
		loader.load(scoI.fontURL, (font) => {
			for (let i = 0; i < 2; i++) {
				if (!i) geometry = new TextGeometry(`${player1} - ${player2}`, {font: font, size: scoI.size, height: scoI.height})
				else geometry = new TextGeometry(`${player2} - ${player1}`, {font: font, size: scoI.size, height: scoI.height})
				geometry.center()
				material = new THREE.MeshBasicMaterial({color: scoI.color})
				score = new THREE.Mesh(geometry, material)
				score.castShadow = true
				score.receiveShadow = true
				if (!i) score.position.copy(scoI.pos)
				else {
					score.position.copy(new THREE.Vector3(scoI.pos.x, scoI.pos.y, -scoI.pos.z))
					score.rotateY(Math.PI)
				}
				this.scene.add(score)
				this.scores.push(score)
			}
		})
	}
}